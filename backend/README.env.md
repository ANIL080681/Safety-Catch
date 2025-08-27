# Environment Configuration

This file contains environment variable templates for the backend application.

## Setup Instructions

1. Copy this file to `.env` in the same directory
2. Replace all placeholder values with your actual credentials
3. Never commit the actual `.env` file to version control

## Required Variables

- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Google Cloud service account JSON file
- `GCS_BUCKET_NAME`: Name of your Google Cloud Storage bucket  
- `SPREADSHEET_ID`: ID of your Google Sheets spreadsheet
- `GEMINI_API_KEY`: Your Google Gemini API key
- `EMAIL_SENDER`: Gmail address for sending notifications
- `EMAIL_PASSWORD`: App password for the Gmail account (not your regular password)

## Security Notes

- Keep your actual `.env` file private and never share it
- Use app passwords for Gmail, not your account password
- Regularly rotate your API keys and credentials
- The `.env` file is ignored by git to prevent accidental commits