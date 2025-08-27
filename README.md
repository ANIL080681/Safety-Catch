# Safety-Catch Application

A safety incident reporting and management system with AI-powered assistance using Google Gemini AI.

## Project Overview

Safety-Catch is a comprehensive safety management application that allows users to report safety incidents (called "CATCHes"), track their status, and get AI-powered assistance throughout the process. The system integrates with Google Cloud services for storage, data analysis, and AI functionality.

## Repository Structure

```
Safety-Catch/
├── backend/          # Node.js server with Express
├── frontend/         # React application
├── files/           # Configuration and utility files
└── README.md        # This file
```

## Git Repository Configuration

### Remote Repository
This project is hosted on GitHub at: `https://github.com/ANIL080681/Safety-Catch`

To verify the git remote configuration:
```bash
git remote -v
```

Expected output:
```
origin	https://github.com/ANIL080681/Safety-Catch (fetch)
origin	https://github.com/ANIL080681/Safety-Catch (push)
```

### Setting up the Repository

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ANIL080681/Safety-Catch.git
   cd Safety-Catch
   ```

2. **Verify remote configuration:**
   ```bash
   git remote -v
   ```

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Features

- **Safety Incident Reporting**: Submit detailed safety incident reports with file attachments
- **AI Assistant**: Integrated Google Gemini AI for intelligent assistance
- **User Management**: User verification and profile management
- **Status Tracking**: Track incident status and approvals
- **Data Analytics**: BigQuery integration for data analysis
- **Cloud Storage**: Google Cloud Storage for file management

## Technology Stack

### Backend
- Node.js with Express
- Google Cloud Platform integration
- Google Sheets API
- Google Cloud Storage
- BigQuery
- Multer for file uploads

### Frontend
- React with Create React App
- Modern JavaScript (ES6+)
- Responsive design

## Environment Configuration

The application requires several environment variables and service account credentials for Google Cloud services. See individual component READMEs for detailed configuration instructions.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Git Workflow

This project follows a standard Git workflow:

1. **Main branch**: `master` - Production-ready code
2. **Feature branches**: `feature/*` - New features and improvements
3. **Fix branches**: `fix/*` or `copilot/fix-*` - Bug fixes and patches

### Syncing Local Changes to Repository

📖 **For comprehensive instructions on syncing your local file changes to git, see [GIT_SYNC_GUIDE.md](./GIT_SYNC_GUIDE.md)**

### Quick Git Commands

```bash
# Check repository status
git status

# View remote configuration
git remote -v

# Pull latest changes
git pull origin master

# Create and switch to new branch
git checkout -b feature-branch-name

# Add and commit changes
git add .
git commit -m "Descriptive commit message"

# Push changes to remote
git push origin branch-name
```

### Basic Sync Workflow

```bash
# 1. Check what files changed
git status

# 2. Add your changes
git add .

# 3. Commit with descriptive message
git commit -m "Description of changes"

# 4. Push to repository
git push origin branch-name
```

## Support

For issues related to git configuration or repository setup, ensure:
1. You have proper access to the repository
2. Git is properly installed and configured
3. Remote URLs are correctly set using `git remote -v`

## License

This project is proprietary software developed for safety management purposes.