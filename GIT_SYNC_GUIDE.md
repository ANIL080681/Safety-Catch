# Git Sync Guide - How to Sync Local Changes to Repository

This comprehensive guide explains how to sync your local file changes to the Safety-Catch git repository.

## Quick Reference

```bash
# 1. Check what files have changed
git status

# 2. Add files to staging area
git add .                    # Add all files
git add filename.js          # Add specific file
git add folder/              # Add entire folder

# 3. Commit your changes
git commit -m "Description of changes"

# 4. Push to remote repository
git push origin branch-name  # Push to specific branch
git push                     # Push to current branch (if upstream is set)
```

## Detailed Step-by-Step Process

### Step 1: Check Current Status

Before making any changes, always check your current git status:

```bash
cd /path/to/Safety-Catch
git status
```

This will show you:
- Which branch you're currently on
- Which files have been modified
- Which files are staged for commit
- Which files are untracked

### Step 2: Review Your Changes

See exactly what changes you've made:

```bash
# See all changes in all files
git diff

# See changes in a specific file
git diff filename.js

# See changes that are already staged
git diff --staged
```

### Step 3: Stage Your Changes

Add files to the staging area (preparing them for commit):

```bash
# Add all modified and new files
git add .

# Add specific files only
git add backend/server.js
git add frontend/src/App.js

# Add all files in a directory
git add backend/

# Add files interactively (choose what to include)
git add -i
```

### Step 4: Commit Your Changes

Create a commit with your staged changes:

```bash
# Commit with a descriptive message
git commit -m "Add new safety reporting feature"

# Commit with a detailed message
git commit -m "Fix user authentication bug

- Updated login validation logic
- Added proper error handling
- Improved session management"

# Commit all modified tracked files (skips git add step)
git commit -am "Quick fix for minor issues"
```

### Step 5: Push to Remote Repository

Send your commits to the remote repository:

```bash
# Push to current branch
git push

# Push to specific branch
git push origin feature-branch-name

# Push and set upstream for new branch
git push -u origin new-feature-branch

# Force push (use with caution)
git push --force-with-lease origin branch-name
```

## Common Scenarios

### Scenario 1: First Time Sync After Making Changes

```bash
# 1. Check what's changed
git status

# 2. Add all changes
git add .

# 3. Commit with message
git commit -m "Updated safety catch functionality"

# 4. Push to remote
git push origin master
```

### Scenario 2: Working on a Feature Branch

```bash
# 1. Create and switch to feature branch
git checkout -b feature/new-reporting-system

# 2. Make your changes to files
# ... edit files ...

# 3. Stage and commit
git add .
git commit -m "Implement new reporting system"

# 4. Push feature branch
git push -u origin feature/new-reporting-system
```

### Scenario 3: Syncing Specific Files Only

```bash
# 1. Check status
git status

# 2. Add only specific files
git add backend/server.js frontend/src/components/NewComponent.js

# 3. Commit
git commit -m "Update server logic and add new component"

# 4. Push
git push
```

### Scenario 4: Sync After Pulling Latest Changes

```bash
# 1. Pull latest changes from remote
git pull origin master

# 2. Make your changes
# ... edit files ...

# 3. Add and commit
git add .
git commit -m "Add features on top of latest changes"

# 4. Push
git push origin master
```

## Branch Management

### Working with Different Branches

```bash
# List all branches
git branch -a

# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Push new branch to remote
git push -u origin new-branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

### Current Repository Branch Structure

This repository uses:
- **master** - Production-ready code
- **feature/*** - New features and improvements  
- **fix/*** or **copilot/fix-*** - Bug fixes and patches

## Troubleshooting Common Issues

### Issue 1: "Your branch is behind 'origin/master'"

```bash
# Solution: Pull the latest changes first
git pull origin master
# Then add, commit, and push your changes
git add .
git commit -m "Your changes"
git push origin master
```

### Issue 2: Merge Conflicts

```bash
# 1. Pull latest changes
git pull origin master

# 2. Git will show conflict files
# Edit files to resolve conflicts (remove <<<< ==== >>>> markers)

# 3. Add resolved files
git add resolved-file.js

# 4. Commit the merge
git commit -m "Resolve merge conflicts"

# 5. Push
git push origin master
```

### Issue 3: Accidentally Committed Wrong Files

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1

# Remove file from staging area
git reset HEAD filename.js
```

### Issue 4: Push Rejected

```bash
# Usually means remote has changes you don't have
git pull origin master
# Resolve any conflicts, then push
git push origin master
```

## Best Practices

### Commit Messages

**Good commit messages:**
```bash
git commit -m "Add user authentication to login form"
git commit -m "Fix memory leak in file upload process"
git commit -m "Update README with installation instructions"
```

**Avoid:**
```bash
git commit -m "fix"
git commit -m "changes"
git commit -m "update stuff"
```

### When to Commit

- Commit after completing a logical unit of work
- Commit before switching branches
- Commit before pulling changes from remote
- Commit frequently to avoid losing work

### What Not to Commit

The repository has a `.gitignore` file that excludes:
- Environment files (`.env`)
- API keys and credentials
- `node_modules/` directories
- Build artifacts (`dist/`, `build/`)
- IDE files (`.vscode/`, `.idea/`)

## Repository Configuration Verification

Verify your repository is properly configured:

```bash
# Check remote repository URL
git remote -v
# Should show: origin https://github.com/ANIL080681/Safety-Catch (fetch)
#             origin https://github.com/ANIL080681/Safety-Catch (push)

# Check current branch
git branch

# Check repository status
git status
```

## Getting Help

If you encounter issues:

1. Check `git status` to understand current state
2. Use `git log --oneline` to see recent commits
3. Use `git diff` to see what changed
4. Check this guide for common scenarios
5. Ensure you have proper repository access permissions

## Summary

The basic workflow is always:
1. **Check** - `git status`
2. **Add** - `git add .` or `git add filename`
3. **Commit** - `git commit -m "Description"`
4. **Push** - `git push origin branch-name`

Remember: Always pull latest changes before pushing if working in a shared repository!