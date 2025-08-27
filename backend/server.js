// server.js
// This server handles form submissions, approvals, status checks, user info lookups,
// and now includes secure endpoints for Gemini and BigQuery.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const { BigQuery } = require('@google-cloud/bigquery'); // Added for BigQuery
const fetch = require('node-fetch'); // Added for Gemini proxy

const app = express();
const port = process.env.PORT || 8080;
const BACKEND_URL = "http://localhost:8080";

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Google API Authentication ---
// This automatically finds your credentials when running on Google Cloud,
// or uses the file specified by GOOGLE_APPLICATION_CREDENTIALS env var.
const auth = new google.auth.GoogleAuth({
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/devstorage.full_control',
        'https://www.googleapis.com/auth/cloud-platform', // Added scope for BigQuery/AI Platform
        'https://www.googleapis.com/auth/drive.readonly', // ADD THIS LINE
    ],
});

// --- Initialize Google Clients ---
const sheets = google.sheets({ version: 'v4', auth });
const storage = new Storage();
const bigquery = new BigQuery(); // Initialize BigQuery Client
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || 'alocrbucket');

// --- File Upload Handling (Multer) ---
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// --- Existing API Endpoints ---
// --- Email Sending Setup ---
const nodemailer = require('nodemailer');

// Configure nodemailer with Gmail SMTP (update with your credentials or use OAuth2 for production)
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// --- Master Data Simulation ---
// In a real application, this data would come from a database.
const masterUserData = {
    "user123": {
        "name": "Anil Agarwal",
        "department": "Technical",
        "location": "Main Plant - Area 1"
    },
    "AL123": {
        "name": "Jaime Leong",
        "department": "Fit PMO, EAP Cluster",
        "location": "VISION EXCHANGE, 2 Venture Drive, SINGAPORE"
    }
};

function generateCatchEmailHtml(summary, incidentId) {
    // Build HTML summary table
    let summaryTable = '<table border="1" cellpadding="5" cellspacing="0">';
    for (const [key, value] of Object.entries(summary)) {
        summaryTable += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
    }
    summaryTable += '</table>';
    // Approve/Reject links (use GET for demo, switch to POST with tokens for production)
    const approveUrl = `${BACKEND_URL}/approveCatch?incidentId=${encodeURIComponent(incidentId)}`;
    const rejectUrl = `${BACKEND_URL}/rejectCatch?incidentId=${encodeURIComponent(incidentId)}`;
    return `
        <h2>CATCH Report Summary</h2>
        ${summaryTable}
        <br>
        <a href="${approveUrl}" style="background:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Approve</a>
        <a href="${rejectUrl}" style="background:#f44336;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-left:10px;">Reject</a>
        <br><br>
        <small>This is an automated email. Please review and take action.</small>
    `;
}
/**
 * @route POST /previewCatch
 * @description Returns a summary of the CATCH report before submission.
 * @access Public
 */
app.post('/previewCatch', upload.single('attachment'), async (req, res) => {
    // Accept all fields from frontend
    const { description, location, subType, catchCategory, approver, department, email, areaDescription } = req.body;
    let fileName = null;
    if (req.file) {
        fileName = req.file.originalname;
    }
    // Compose summary object
    const summary = {
        Description: description || 'See attached document.',
        Location: location || '',
        SubType: subType || '',
        CatchCategory: catchCategory || '',
        Department: department || '',
        Approver: approver || '',
        Email: email || '',
        AreaDescription: areaDescription || '',
        Attachment: fileName || 'None'
    };
    res.status(200).json({ success: true, summary });
});

app.get('/getUserInfo', (req, res) => {
    const { userId } = req.query;
    if (masterUserData[userId]) {
        res.status(200).json(masterUserData[userId]);
    } else {
        res.status(404).json({ message: "User not found." });
    }
});
app.post('/submitCatch', upload.single('attachment'), async (req, res) => {
    try {
        // Accept additional requestor info from frontend, now includes userId
        const { description, location, subType, catchCategory, approver, department, email, areaDescription, userId } = req.body;
        let fileUrl = null;
        
        // Get user info from master data if it exists
        const userInfo = masterUserData[userId] || {};
        const finalDepartment = department || userInfo.department || '';
        const finalLocation = location || userInfo.location || '';
        const finalEmail = email || '';
        const finalAreaDescription = areaDescription || '';
        if (req.file) {
            const blob = bucket.file(`catch-attachments/${Date.now()}-${req.file.originalname}`);
            const blobStream = blob.createWriteStream({ resumable: false, contentType: req.file.mimetype });
            await new Promise((resolve, reject) => {
                blobStream.on('finish', () => {
                    fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    resolve();
                }).on('error', (err) => {
                    reject(new Error(`Unable to upload file: ${err.message}`));
                });
                blobStream.end(req.file.buffer);
            });
        }
        // Use only CatchSubmissions tab
        const spreadsheetId = '1-k5iqvDt_1ZSPmJnrO0Zynj__nVTzfgfYhH_GHJKu2k';
        console.log('Using spreadsheet ID for submission:', spreadsheetId);
        function pad(n) { return n < 10 ? '0' + n : n; }
        const now = new Date();
        const dateStr = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}`;
        const timeStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        const incidentId = `CATCH-${dateStr}-${timeStr}-${randomStr}`;
        const timestamp = now.toISOString();
        const newRow = [
            incidentId, timestamp, description || 'See attached document.', finalLocation,
            subType || '', catchCategory || '', finalDepartment,
            approver || '', fileUrl || 'N/A', 'Submitted', 'Pending',
            finalEmail, finalDepartment, finalLocation, finalAreaDescription
        ];
        // First, check if headers exist in CatchSubmissions tab
        try {
            const headerRow = [
                'Incident ID', 'Timestamp', 'Description', 'Location', 'SubType', 'CatchCategory', 'Department',
                'Approver', 'FileUrl', 'Status', 'ApprovalStatus', 'Email', 'Department', 'Location', 'AreaDescription'
            ];
            let needHeaders = false;
            try {
                const sheetData = await sheets.spreadsheets.values.get({
                    spreadsheetId,
                    range: 'CatchSubmissions!A1:O1',
                });
                if (!sheetData.data.values || sheetData.data.values.length === 0) {
                    needHeaders = true;
                } else {
                    const firstRow = sheetData.data.values[0];
                    if (firstRow.length < headerRow.length || firstRow.some((h, i) => h !== headerRow[i])) {
                        needHeaders = true;
                    }
                }
            } catch (headerErr) {
                needHeaders = true;
            }
            if (needHeaders) {
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: 'CatchSubmissions!A1:O1',
                    valueInputOption: 'USER_ENTERED',
                    resource: { values: [headerRow] },
                });
                console.log('Headers added to CatchSubmissions tab.');
            }
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: 'CatchSubmissions',
                valueInputOption: 'USER_ENTERED',
                resource: { values: [newRow] },
            });
            console.log(`Successfully appended to CatchSubmissions tab:`, {
                incidentId, timestamp, description, finalLocation, subType, catchCategory, approver, finalDepartment, fileUrl, finalEmail, finalAreaDescription
            });

            // --- Send email to approver ---
            const summary = {
                Description: description || 'See attached document.',
                Location: finalLocation,
                SubType: subType || '',
                CatchCategory: catchCategory || '',
                Department: finalDepartment,
                Approver: approver || '',
                Email: finalEmail,
                AreaDescription: finalAreaDescription,
                Attachment: fileUrl || 'None'
            };
            // Always send to hardcoded email for testing
            const mailOptions = {
                from: process.env.EMAIL_SENDER,
                to: 'anil.agarwal33@gmail.com',
                subject: `CATCH Report Approval Needed: ${incidentId}`,
                html: generateCatchEmailHtml(summary, incidentId)
            };
            try {
                await mailTransport.sendMail(mailOptions);
                console.log(`Approval email sent to anil.agarwal33@gmail.com`);
            } catch (mailErr) {
                console.error('Error sending approval email:', mailErr);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                console.error('Google Sheets API error details:', JSON.stringify(err.response.data, null, 2));
            }
            console.error('Error appending to CatchSubmissions tab:', err);
        }
        res.status(200).json({ 
            success: true, 
            incidentId, 
            message: `CATCH ${incidentId} submitted successfully.`
        });
    } catch (error) {
        console.error('Error in /submitCatch endpoint:', error);
        res.status(500).json({ success: false, message: error.message || 'An internal server error occurred.' });
    }
});

app.post('/approveCatch', async (req, res) => {
    const { incidentId } = req.body;
    const spreadsheetId = '1-k5iqvDt_1ZSPmJnrO0Zynj__nVTzfgfYhH_GHJKu2k';
    try {
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'CatchSubmissions!A:O' });
        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Sheet is empty.' });
        }
        // Find the row index for the incidentId (skip header row)
        const rowIndex = rows.findIndex((row, idx) => idx > 0 && row && row[0] === incidentId);
        if (rowIndex === -1) {
            return res.status(404).json({ success: false, message: `CATCH ID ${incidentId} not found.` });
        }
        // Column K is index 10 (ApprovalStatus)
        const targetCell = `CatchSubmissions!K${rowIndex + 1}`;
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: targetCell,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [['Approved']] },
        });
        res.status(200).json({ success: true, message: `CATCH ${incidentId} has been approved.` });
    } catch (error) {
        console.error('Error approving CATCH:', error);
        res.status(500).json({ success: false, message: 'Failed to approve CATCH.' });
    }
});

app.get('/getCatchStatus', async (req, res) => {
    const { incidentId } = req.query;
    const spreadsheetId = '1-k5iqvDt_1ZSPmJnrO0Zynj__nVTzfgfYhH_GHJKu2k';
    try {
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'CatchSubmissions!A:O' });
        const rows = response.data.values;
        if (rows && rows.length) {
            // Find the row for the incidentId (skip header row)
            const incidentRow = rows.find((row, idx) => idx > 0 && row && row[0] === incidentId);
            if (incidentRow) {
                const [id, time, desc, loc, sub, cat, dept, appr, url, stat, apprStat] = incidentRow;
                res.status(200).json({
                    success: true,
                    status: stat || 'No Status',
                    approvalStatus: apprStat || 'No Status',
                    details: `CATCH ${id} reported on ${new Date(time).toLocaleString()} in category '${cat}' is currently: ${apprStat || 'Pending'}.`
                });
            } else {
                res.status(404).json({ success: false, message: 'Incident not found.' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Sheet is empty or unreadable.' });
        }
    } catch (error) {
        console.error('Error reading from sheet:', error);
        res.status(500).json({ success: false, message: 'Failed to read from sheet.' });
    }
});


// --- NEW: Secure Gemini API Proxy Endpoint ---
/**
 * @route POST /callGemini
 * @description Securely calls the Gemini API on behalf of the frontend.
 */
app.post('/callGemini', async (req, res) => {
    const { contents, tools } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ message: "Gemini API key is not configured on the server." });
    }
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const geminiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents, tools }),
        });
        const data = await geminiResponse.json();
        res.status(geminiResponse.status).json(data);
    } catch (error) {
        console.error('Error proxying to Gemini API:', error);
        res.status(500).json({ message: 'Error calling Gemini API' });
    }
});


// --- NEW: BigQuery Query Endpoint ---
/**
 * @route POST /queryBigQuery
 * @description Executes a SQL query against BigQuery on behalf of the frontend.
 */
app.post('/queryBigQuery', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'A SQL query is required.' });
    }

    try {
        const options = {
            query: query,
            // Make sure this location matches your BigQuery dataset's location.
            location: 'US', 
        };

        const [rows] = await bigquery.query(options);
        res.status(200).json(rows);

    } catch (error) {
        console.error('BIGQUERY ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});


// --- Start Server ---
const host = '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Backend server listening at http://${host}:${port}`);
});