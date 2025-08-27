import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icon Components ---
// (These are kept the same as before for brevity)
const AirLiquideLogo = () => ( <svg height="32" width="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 354.33299999999997 67.723" className="mr-4"><g fill="#dd1b2d"><path d="M141.14 29.792s0 2.632.003 3.885c.364-.718 2.759-4.775 7.568-4.775h1.49v6.703h-1.524c-4.411 0-6.855 3.245-6.855 7.286v14.916h-7.869V29.792zM223.356 33.19v-3.398h7.185v37.93h-7.887v-9.915h-8.147c-8.276 0-14.719-6.467-14.719-14.446 0-8.251 6.758-14.459 14.28-14.459 6.106 0 9.288 4.289 9.288 4.289zm-.702 10.234c0-4.25-3.515-7.669-7.817-7.669-4.24 0-7.688 3.232-7.813 7.436-.126 4.287 3.282 7.902 7.813 7.902l7.817-.003z"/><path d="M126.138 19.5v6.728h-7.869v-6.729zm0 10.292v28.015h-7.869V29.792z" fillRule="evenodd"/><path d="M101.79 57.807V45.151H87.64v12.656h-7.966l.009-22.28c0-8.842 7.611-16.027 17.035-16.027h13.038v38.307zm-5.072-31.579c-5.006 0-9.076 3.824-9.076 8.563v4h14.146l.001-12.563z"/><path d="M194.18 29.792v28.015h-7.868V29.792zm0-10.292v6.728h-7.868V19.5zM281.233 29.792v28.015h-7.869V29.792zm0-10.292v6.728h-7.869V19.5zM237.483 29.792h7.866V45.45c0 4.267 3.14 6.542 6.194 6.542 2.95 0 6.378-1.955 6.378-6.541V29.792h7.866v28.025h-7.188v-3.394l-.12.137c-2.285 2.594-5.5 4.145-9.213 4.145-6.038 0-11.775-4.94-11.775-12.103z" fillRule="evenodd"/><path d="M170.86 19.5v31.59h10.254v6.698l-18.22.02V19.498zM310.398 54.41v3.396h7.185V19.5h-7.885v10.292h-8.147c-8.277 0-14.717 6.469-14.717 14.448 0 8.25 6.755 14.457 14.278 14.457 6.105 0 9.286-4.287 9.286-4.287zm-.7-10.233c0 4.247-3.516 7.666-7.817 7.666-4.24 0-7.687-3.23-7.81-7.435-.13-4.286 3.278-7.9 7.81-7.9l7.817.002zM339.027 58.705c-8.75 0-15.848-6.672-15.848-14.902S330.27 28.9 339.02 28.9c8.755 0 15.313 6.68 15.313 14.904 0 .81-.03 1.594-.138 2.527l-23.473.003c1.17 3.474 4.267 5.962 8.298 5.962 3.73 0 6.007-1.155 7.882-3.343l5.66 3.678c-3.07 3.742-7.783 6.075-13.534 6.075zm-8.286-17.492h16.056c-1.14-3.471-3.764-5.902-7.778-5.902-4.023 0-7.138 2.48-8.278 5.902"/></g><path d="M33.818 19.498c7.91 0 14.321 6.413 14.321 14.32V48.14H33.82c-7.91 0-14.322-6.411-14.322-14.321 0-7.908 6.412-14.321 14.321-14.321zm23.987 38.31H33.817c-13.25 0-23.988-10.74-23.988-23.987 0-13.25 10.739-23.99 23.988-23.99 13.248 0 23.988 10.74 23.988 23.99zM33.862 0H0v33.863c0 18.703 15.16 33.86 33.862 33.86 18.701 0 33.862-15.157 33.862-33.86C67.724 15.162 52.563 0 33.862 0" fill="#3c60a5"/></svg> );
const GeminiSparkIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3 text-blue-600 flex-shrink-0"><path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" fill="currentColor"></path><path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" fill="currentColor"></path><path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="currentColor"></path><path d="M12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.99984 2H18.9998C20.6567 2 21.9998 3.34315 21.9998 5V19C21.9998 20.6569 20.6567 22 18.9998 22H4.99984C3.34299 22 1.99984 20.6569 1.99984 19V5C1.99984 3.34315 3.34299 2 4.99984 2ZM18.9998 20H4.99984C4.44756 20 3.99984 19.5523 3.99984 19V5C3.99984 4.44772 4.44756 4 4.99984 4H18.9998C19.5521 4 19.9998 4.44772 19.9998 5V19C19.9998 19.5523 19.5521 20 18.9998 20Z" fill="currentColor"></path></svg> );
const PaperclipIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg> );
const SendIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z" fill="currentColor"/></svg> );
const MicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg> );
const Spinner = () => ( <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-blue-600"></div> );

// --- Child Components ---

const DataTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }
    const headers = Object.keys(data[0]);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map(header => <th key={header} className="text-left py-2 px-3 border-b">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {headers.map(header => <td key={`${index}-${header}`} className="py-2 px-3 border-b">{String(row[header])}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const ChatMessage = ({ message }) => {
    const { role, content, data } = message;
    const isUser = role === 'user';
    return (
        <div className={`flex items-start mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
            { !isUser && <GeminiSparkIcon />}
            <div className={`rounded-2xl px-5 py-3 max-w-2xl shadow-md ${isUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                {content && <p className="text-base whitespace-pre-wrap leading-relaxed">{content}</p>}
                {data && <div className="mt-3"><DataTable data={data} /></div>}
            </div>
        </div>
    );
};
const CatchCategoriesSidebar = () => ( <aside className="w-1/3 p-6 bg-white border-l border-gray-200 hidden lg:block"> <h3 className="text-lg font-semibold text-gray-700 mb-6">CATCH Categories</h3> <div className="space-y-5"> <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg></div><div className="ml-4"><h4 className="font-semibold text-red-600">Safety CATCH</h4><p className="text-sm text-gray-600 mt-1">Proactively identify and address hazards. (e.g., Near-miss, Stop Work, Good Practices)</p></div></div> <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div><div className="ml-4"><h4 className="font-semibold text-blue-600">Reliability CATCH</h4><p className="text-sm text-gray-600 mt-1">Mitigate potential disruptions to ensure plant & equipment reliability. (e.g., Reliability Near-miss)</p></div></div> <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div className="ml-4"><h4 className="font-semibold text-green-600">Quality CATCH</h4><p className="text-sm text-gray-600 mt-1">Capture deviations in quality to deliver the best products. (e.g., Quality Near-miss)</p></div></div> <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg></div><div className="ml-4"><h4 className="font-semibold text-purple-600">Performance CATCH</h4><p className="text-sm text-gray-600 mt-1">Continuously improve to enhance efficiency and value. (e.g., Improvement ideas)</p></div></div> </div> </aside> );
const WelcomeScreen = ({ setInput, textareaRef }) => {
    const handleSuggestionClick = (text) => {
        setInput(text);
        setTimeout(() => textareaRef.current?.focus(), 0);
    };
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <AirLiquideLogo />
            <h2 className="text-3xl font-semibold text-gray-800 mt-8">EAP CATCH Submission Platform</h2>
            <p className="mt-2 max-w-lg text-lg">Your AI-powered assistant for reporting and analyzing CATCH data.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => handleSuggestionClick('How many CATCHes were submitted last month?')}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                >
                    Analyze CATCH Data
                </button>
                <button
                    onClick={() => handleSuggestionClick('I want to submit a new CATCH.')}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                >
                    Submit a New CATCH
                </button>
            </div>
        </div>
    );
};

// --- Additional Info Step Form ---
const departments = [
    "Finance", "HR", "Sales & Marketing", "HSEQ", "Cylinder Filling Plant", "Logistic",
    "ASU", "Technical", "Contractor", "Visitor", "Other"
];
const locations = [
    "Main Building", "ASU Plant", "Filling Plant", "PG / Bulk Logistic", "Technical CSCI",
    "Customer", "Project Customer", "Visitor", "Sales & Marketing"
];

const AdditionalInfoForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [otherDepartment, setOtherDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [areaDesc, setAreaDesc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            email,
            department: department === "Other" ? otherDepartment : department,
            location,
            areaDesc
        });
    };

    return (
        <form className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Requestor Information</h2>
            <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">Email of Requestor<span className="text-red-500">*</span></label>
                <input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">My Department<span className="text-red-500">*</span></label>
                <select className="w-full border rounded px-3 py-2" value={department} onChange={e => setDepartment(e.target.value)} required>
                    <option value="">Select Department</option>
                    {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </select>
                {department === "Other" && (
                    <input type="text" className="mt-2 w-full border rounded px-3 py-2" placeholder="Please specify department" value={otherDepartment} onChange={e => setOtherDepartment(e.target.value)} required />
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">Facility/Location Name<span className="text-red-500">*</span></label>
                <select className="w-full border rounded px-3 py-2" value={location} onChange={e => setLocation(e.target.value)} required>
                    <option value="">Select Location</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">Description of the Specific Area<span className="text-red-500">*</span></label>
                <textarea
                    className="w-full border rounded px-3 py-2"
                    value={areaDesc}
                    onChange={e => setAreaDesc(e.target.value)}
                    placeholder="e.g. IG Filling Center, Cylinder Testing Center, ASU Control Room, Coldbox, etc... For customer premises / road event, please indicate the location here"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Continue</button>
        </form>
    );
};

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);
    // step 0: Welcome, step 1: Requestor Info, step 2: Category Select, step 3: Chat
    const [step, setStep] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [requestorInfo, setRequestorInfo] = useState(null);

    // --- Refs for DOM elements ---
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const recognitionRef = useRef(null);

    // --- Configuration ---
    const BACKEND_URL = 'http://localhost:8080'; // Use local backend for development
    
    // 🚨 API Key stored on the frontend for local testing ONLY.
    // 🚨 REMOVE THIS and move the API call to your backend before deploying.
    const API_KEY = "AIzaSyCTslbsFtpoSCFbaXl_34SuVM819l_X210"; // Replace with your actual key
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    // --- Gemini Function Tools Definition ---
    const tools = [{
        functionDeclarations: [
            {
                name: 'performBigQueryAnalysis',
                description: 'When a user asks a question about CATCH data, trends, or statistics, translate their question into a standard Google SQL query for BigQuery and execute it.',
                parameters: {
                    type: 'OBJECT',
                    properties: {
                        query: {
                            type: 'STRING',
                            description: 'A valid Google SQL query to run against the BigQuery table `genuine-flight-467208-p2.BigQuery.Safety_data`. The table schema is: `DATE` DATE, `EMAIL` STRING, `DPT` STRING, `FM` STRING, `DESC` STRING, `CAT` STRING, `SWA` BOOLEAN, `SC_DESC` STRING, `SC_AT` STRING, `PR_HZD` STRING, `LSR` STRING, `TAG` STRING, `PC_DESC` STRING, `WST_IDN` STRING, `PIA_RPR` STRING, `GAIN` STRING, `QC_DESC` STRING, `QC_RPR` STRING, `RC_DESC` STRING, `RC_RPR` STRING, `UPLOAD` STRING, `FM_EMAIL` STRING. IMPORTANT: The `DATE` column is already a DATE type, so you can perform direct date comparisons on it without casting (e.g., `WHERE DATE >= "2025-01-01"`).',
                        }
                    },
                    required: ['query']
                }
            },
            { name: 'submitCatch', description: 'Files a new CATCH submission to the backend. Use for all new submissions.', parameters: { type: 'OBJECT', properties: { description: { type: 'STRING', description: 'A detailed description of the CATCH.' }, location: { type: 'STRING', description: 'The specific location related to the CATCH. This is optional if the user provides a User ID.' }, subType: { type: 'STRING', description: 'A more specific type for the CATCH, e.g., "Near-miss", "Good Practice", "Improvement Idea".' }, catchCategory: { type: 'STRING', description: 'The main category. Must be one of: "Safety", "Reliability", "Quality", or "Performance".', enum: ["Safety", "Reliability", "Quality", "Performance"] }, approver: { type: 'STRING', description: 'The name or email of the person who needs to approve this CATCH.' }, department: { type: 'STRING', description: 'The department of the submitter. This is optional if the user provides a User ID.' }, }, required: ['description', 'subType', 'catchCategory', 'approver'], }, }, { name: 'approveCatch', description: 'Approves a CATCH using its ID.', parameters: { type: 'OBJECT', properties: { incidentId: { type: 'STRING' } }, required: ['incidentId'] } }, { name: 'getCatchStatus', description: 'Retrieves the status of a CATCH using its ID.', parameters: { type: 'OBJECT', properties: { incidentId: { type: 'STRING' } }, required: ['incidentId'] } },
        ],
    },];

    // --- Backend API Functions ---
    // Always include selectedCategory in backend submission
    const submitCatchToBackend = async (data, file) => {
        const formData = new FormData();
        // Merge requestorInfo and selectedCategory into submission data
        const fullData = {
            ...data,
            email: requestorInfo?.email || '',
            department: requestorInfo?.department || '',
            location: requestorInfo?.location || '',
            areaDescription: requestorInfo?.areaDesc || '',
            catchCategory: data.catchCategory || selectedCategory || '',
        };
        for (const key in fullData) {
            formData.append(key, fullData[key]);
        }
        if (file) { formData.append('attachment', file); }
        const response = await fetch(`${BACKEND_URL}/submitCatch`, { method: 'POST', body: formData });
        if (!response.ok) { const err = await response.json(); throw new Error(err.message || 'Failed to submit CATCH to backend.'); }
        return await response.json();
    };
    const approveCatchOnBackend = async (incidentId) => { const response = await fetch(`${BACKEND_URL}/approveCatch`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ incidentId }) }); if (!response.ok) throw new Error('Failed to approve CATCH via backend.'); return await response.json(); };
    const getStatusFromBackend = async (incidentId) => { const response = await fetch(`${BACKEND_URL}/getCatchStatus?incidentId=${incidentId}`); if (!response.ok) throw new Error('Failed to get CATCH status from backend.'); return await response.json(); };
    const queryBigQueryOnBackend = async (query) => { const response = await fetch(`${BACKEND_URL}/queryBigQuery`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) }); if (!response.ok) { const err = await response.json(); throw new Error(err.message || 'Failed to query BigQuery.'); } return await response.json(); };

    // --- Utility Functions ---
    const fileToBase64 = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error); });

    // --- Effects ---
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
    useEffect(() => { const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (SpeechRecognition) { const recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = true; recognition.onresult = (event) => { let finalTranscript = ''; for (let i = event.resultIndex; i < event.results.length; ++i) { if (event.results[i].isFinal) { finalTranscript += event.results[i][0].transcript.trim() + ' '; } } if (finalTranscript) setInput(prevInput => prevInput + finalTranscript); }; recognition.onend = () => setIsListening(false); recognitionRef.current = recognition; } else { setSpeechSupported(false); } }, []);

    // --- Event Handlers ---
    const handleFileChange = async (e) => { const file = e.target.files[0]; if (file) { setAttachedFile(file); try { const base64 = await fileToBase64(file); setImageBase64(base64); } catch (error) { console.error("Error converting file to Base64:", error); setAttachedFile(null); setImageBase64(null); } } };
    const handleInput = (e) => { setInput(e.target.value); if (textareaRef.current) { textareaRef.current.style.height = 'auto'; textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; } };
    const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!isLoading) handleSend(); } };
    const toggleListening = () => { if (!recognitionRef.current) return; if (isListening) { recognitionRef.current.stop(); } else { setInput(''); recognitionRef.current.start(); } setIsListening(!isListening); };

    // --- Main Send Logic ---
    const handleSend = async () => {
        if (!input.trim() && !attachedFile) return;

        const currentInput = input.trim();
        const currentFile = attachedFile;
        const currentBase64 = imageBase64;

        const userMessageContent = currentInput || (currentFile ? `Image: ${currentFile.name}` : '');
        setMessages(prev => [...prev, { role: 'user', content: userMessageContent }]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(({ role, content, data }) => ({ role, parts: [{ text: content || '' }] }));
            const userParts = [{ text: currentInput || "Describe this image in detail and format it as a CATCH description." }];
            if (currentBase64) {
                userParts.push({ inlineData: { mimeType: currentFile.type, data: currentBase64.split(',')[1] } });
            }
            const contents = [...history, { role: 'user', parts: userParts }];

            const payload = { contents, tools };
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`Gemini API call failed: ${response.status}`);
            const result = await response.json();
            const firstCandidate = result.candidates?.[0];
            if (!firstCandidate) throw new Error('No response candidate found from Gemini.');

            const functionCall = firstCandidate.content.parts.find(p => p.functionCall)?.functionCall;

            if (functionCall) {
                const { name: functionName, args } = functionCall;
                let functionResult;
                let isFunctionSuccess = false;

                if (functionName === 'performBigQueryAnalysis') {
                    const bqData = await queryBigQueryOnBackend(args.query);
                    setMessages(prev => [...prev, { role: 'model', content: "Here are the results from your analysis:", data: bqData }]);
                    isFunctionSuccess = false; // Stop here, no second call to Gemini needed
                } else if (functionName === 'submitCatch') {
                    // Always include selectedCategory in backend submission
                    const catchData = { ...args };
                    if (!catchData.catchCategory && selectedCategory) {
                        catchData.catchCategory = selectedCategory;
                    }
                    functionResult = await submitCatchToBackend(catchData, currentFile);
                    isFunctionSuccess = true;
                } else if (functionName === 'getCatchStatus') {
                    functionResult = await getStatusFromBackend(args.incidentId);
                    isFunctionSuccess = true;
                } else if (functionName === 'approveCatch') {
                    functionResult = await approveCatchOnBackend(args.incidentId);
                    isFunctionSuccess = true;
                } else {
                    throw new Error(`Unknown function call: ${functionName}`);
                }

                if (isFunctionSuccess) {
                    contents.push(firstCandidate.content);
                    contents.push({ role: 'function', parts: [{ functionResponse: { name: functionName, response: { result: functionResult } } }] });

                    const secondResponse = await fetch(GEMINI_API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents, tools }),
                    });

                    const secondResult = await secondResponse.json();
                    const finalResponseText = secondResult.candidates?.[0]?.content.parts.find(p => p.text)?.text;
                    if (finalResponseText) {
                        setMessages(prev => [...prev, { role: 'model', content: finalResponseText }]);
                    }
                } else if (functionResult) {
                    setMessages(prev => [...prev, { role: 'model', content: functionResult }]);
                }

            } else {
                const textResponse = firstCandidate.content.parts.find(p => p.text)?.text;
                if (textResponse) {
                    setMessages(prev => [...prev, { role: 'model', content: textResponse }]);
                } else {
                    throw new Error("No text or function call found in the response.");
                }
            }
        } catch (error) {
            console.error('Error in handleSend:', error);
            setMessages(prev => [...prev, { role: 'model', content: `Sorry, something went wrong: ${error.message}` }]);
        } finally {
            setIsLoading(false);
            setAttachedFile(null);
            setImageBase64(null);
        }
    };

    // --- JSX Render ---
    // CATCH Category selection icons
    const catchCategories = [
        {
            key: 'Safety',
            label: 'Safety CATCH',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
        },
        {
            key: 'Reliability',
            label: 'Reliability CATCH',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        },
        {
            key: 'Quality',
            label: 'Quality CATCH',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        },
        {
            key: 'Performance',
            label: 'Performance CATCH',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
        }
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
            <header className="p-4 border-b border-gray-200 bg-white/70 backdrop-blur-sm flex items-center shadow-sm">
                <AirLiquideLogo />
                <h1 className="text-xl font-semibold text-gray-800">EAP CATCH Submission Bot</h1>
            </header>

            <div className="flex-1 flex w-full overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 overflow-y-auto">
                        {step === 0 && (
                            <WelcomeScreen
                                setInput={text => {
                                    if (text === 'I want to submit a new CATCH.') {
                                        setStep(1);
                                    } else {
                                        setInput(text);
                                        setStep(3);
                                    }
                                }}
                                textareaRef={textareaRef}
                            />
                        )}
                        {step === 1 && (
                            <AdditionalInfoForm onSubmit={info => { setRequestorInfo(info); setStep(2); }} />
                        )}
                        {step === 2 && (
                            <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Select CATCH Category</h2>
                                <div className="flex justify-between gap-6">
                                    {catchCategories.map(cat => (
                                        <button
                                            key={cat.key}
                                            className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-colors focus:outline-none ${selectedCategory === cat.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                                            onClick={() => { setSelectedCategory(cat.key); setStep(3); }}
                                        >
                                            {cat.icon}
                                            <span className="mt-2 font-medium text-gray-700">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <>
                                <div className="max-w-lg mx-auto mb-8 bg-white p-6 rounded-xl shadow border border-gray-200">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Information</h3>
                                    <div className="mb-2"><strong>Email:</strong> {requestorInfo?.email}</div>
                                    <div className="mb-2"><strong>Department:</strong> {requestorInfo?.department}</div>
                                    <div className="mb-2"><strong>Location:</strong> {requestorInfo?.location}</div>
                                    <div className="mb-2"><strong>Area Description:</strong> {requestorInfo?.areaDesc}</div>
                                    <div className="mb-2"><strong>CATCH Category:</strong> {selectedCategory}</div>
                                </div>
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-500 mb-8">You can now start your CATCH submission or ask questions.</div>
                                ) : (
                                    <>
                                        {messages.map((msg, index) => ( <ChatMessage key={index} message={msg} /> ))}
                                    </>
                                )}
                            </>
                        )}

                        {isLoading && (
                            <div className="flex items-start mb-6"><GeminiSparkIcon /><div className="rounded-xl px-4 py-3 bg-white text-gray-800 shadow-md flex items-center"><Spinner /><span className="ml-3">Thinking...</span></div></div>
                        )}
                        <div ref={chatEndRef} />
                    </main>

                    {step === 3 && (
                        <footer className="bg-transparent pt-2 pb-4 px-4">
                            <div className="max-w-4xl mx-auto">
                                {attachedFile && (
                                    <div className="mb-3 text-sm text-gray-700 bg-blue-100 p-3 rounded-lg w-fit shadow-sm border border-blue-200">
                                        Attached: {attachedFile.name}
                                        <button onClick={() => { setAttachedFile(null); setImageBase64(null); }} className="ml-3 text-red-500 font-bold hover:text-red-700">✕</button>
                                    </div>
                                )}
                                <div className="flex items-end bg-white rounded-3xl p-3 shadow-xl border border-gray-200/80 transition-all duration-300 focus-within:shadow-2xl">
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                                    <button onClick={() => fileInputRef.current.click()} disabled={isLoading} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"><PaperclipIcon /></button>
                                    <textarea ref={textareaRef} rows="1" className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-500 px-3 text-base resize-none max-h-64 overflow-y-auto min-h-[48px] transition-all duration-200 ease-in-out" placeholder={isListening ? "Listening..." : "Describe a CATCH or enter an ID..."} value={input} onChange={handleInput} onKeyDown={handleKeyDown} disabled={isLoading} />
                                    <button onClick={toggleListening} disabled={isLoading || !speechSupported} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`} title={!speechSupported ? "Speech recognition is not supported in your browser" : "Toggle voice input"}><MicIcon /></button>
                                    <button onClick={handleSend} disabled={isLoading || (!input.trim() && !attachedFile)} className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 self-end ml-2"><SendIcon /></button>
                                </div>
                            </div>
                        </footer>
                    )}
                </div>
                <CatchCategoriesSidebar />
            </div>
        </div>
    );
}
