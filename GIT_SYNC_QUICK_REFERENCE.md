# Quick Git Sync Reference Card

## 🚀 Basic Sync Workflow (Most Common)
```bash
git status                           # Check what changed
git add .                           # Add all files
git commit -m "Description"         # Commit with message  
git push origin branch-name         # Push to repository
```

## 📋 Essential Commands
```bash
git status                          # See current state
git diff                            # See what changed
git add filename.js                 # Add specific file
git add .                          # Add all files
git commit -m "Fix login bug"       # Commit changes
git push                           # Push to current branch
git pull origin master             # Get latest changes
```

## 🌿 Branch Operations  
```bash
git branch                          # List branches
git checkout -b new-feature        # Create & switch to branch
git checkout master                 # Switch to master
git push -u origin new-feature     # Push new branch
```

## 🛠️ Common Fixes
```bash
git reset HEAD filename.js          # Unstage file
git checkout filename.js            # Discard changes  
git reset --soft HEAD~1             # Undo last commit (keep changes)
git pull origin master              # Fix "behind remote" issue
```

## 📍 This Repository
- **Remote**: https://github.com/ANIL080681/Safety-Catch
- **Main Branch**: master
- **Feature Branches**: feature/*
- **Fix Branches**: fix/* or copilot/fix-*

---
💡 **Need detailed help?** See [GIT_SYNC_GUIDE.md](./GIT_SYNC_GUIDE.md) for comprehensive instructions!