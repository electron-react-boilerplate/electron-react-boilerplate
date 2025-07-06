# Commit Work - Logical Grouping & Conventional Commits

## Overview

This guide provides a systematic approach to commit all unstaged files in logical groups using conventional commit messages and create proper pull requests.

## Workflow Steps

### 1. Analyze Unstaged Changes

```bash
# Check all unstaged files
git status --porcelain

# Get detailed diff overview
git diff --name-status

# Review changes by file type
git diff --stat
```

### 2. Group Changes Logically

Organize files into logical groups based on:
- **Feature additions** - New functionality
- **Bug fixes** - Error corrections
- **Documentation** - README, docs, comments
- **Configuration** - Config files, dependencies
- **Refactoring** - Code improvements without behavior change
- **Styling** - Code formatting, CSS changes

### 3. Create Feature Branches

```bash
# Create and switch to feature branch
git checkout -b feature/descriptive-name

# For different change types:
git checkout -b feat/add-user-authentication
git checkout -b fix/resolve-login-error
git checkout -b docs/update-api-documentation
git checkout -b refactor/optimize-database-queries
```

### 4. Commit in Logical Groups

#### Conventional Commit Format
```
<type>: <description>

[optional body]

[optional footer]
```

#### Commit Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

#### Commit Commands
```bash
# Add files for specific group
git add path/to/feature/files

# Commit with conventional message
git commit -m "feat: add user authentication system"

# For multiple related files
git add src/auth/ src/middleware/auth.js
git commit -m "feat: implement JWT authentication middleware"

# For bug fixes
git add src/components/LoginForm.js
git commit -m "fix: resolve login form validation error"

# For documentation
git add README.md docs/
git commit -m "docs: update API documentation and setup guide"
```

### 5. Push Branches

```bash
# Push feature branch
git push -u origin feature/descriptive-name

# Push all branches
git push --all origin
```

### 6. Create Pull Requests

#### PR Title Format (Conventional)
```
<type>: <description>
```

#### PR Body Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- List specific changes
- Include file modifications
- Mention any dependencies added/removed

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Related Issues
Closes #issue-number
```

## Example Workflow

### Scenario: Multiple unstaged changes

```bash
# 1. Check status
git status

# 2. Group and commit authentication feature
git checkout -b feat/user-authentication
git add src/auth/ src/middleware/auth.js tests/auth.test.js
git commit -m "feat: add JWT authentication system with middleware"

# 3. Switch to new branch for bug fix
git checkout main
git checkout -b fix/login-validation
git add src/components/LoginForm.js
git commit -m "fix: resolve email validation in login form"

# 4. Switch to new branch for documentation
git checkout main
git checkout -b docs/api-updates
git add README.md docs/api.md
git commit -m "docs: update API documentation and installation guide"

# 5. Push all branches
git push -u origin feat/user-authentication
git push -u origin fix/login-validation
git push -u origin docs/api-updates
```

### Create PRs with GitHub CLI (optional)
```bash
# Create PR for each branch
gh pr create --title "feat: add JWT authentication system" --body-file pr-template.md

gh pr create --title "fix: resolve email validation in login form" --body-file pr-template.md

gh pr create --title "docs: update API documentation" --body-file pr-template.md
```

## Commit Message Examples

### Good Examples
```bash
git commit -m "feat: add user profile management"
git commit -m "fix: resolve memory leak in image processing"
git commit -m "docs: add contributing guidelines"
git commit -m "refactor: optimize database connection pooling"
git commit -m "style: format code according to ESLint rules"
git commit -m "test: add unit tests for authentication module"
git commit -m "chore: update dependencies to latest versions"
```

### With Body and Footer
```bash
git commit -m "feat: add user profile management

Allow users to update their profile information including
avatar, bio, and contact details.

Closes #123"
```

## Best Practices

1. **Keep commits atomic** - One logical change per commit
2. **Write clear descriptions** - Explain what and why, not how
3. **Use present tense** - "add feature" not "added feature"
4. **Limit first line to 50 characters** - For better readability
5. **Separate subject from body** - Use blank line between them
6. **Reference issues** - Include issue numbers when applicable

## Quick Reference

### Common Git Commands
```bash
# Stage specific files
git add <file1> <file2>

# Stage all files of a type
git add *.js

# Stage files in directory
git add src/components/

# Commit with message
git commit -m "type: description"

# Push branch
git push -u origin branch-name

# Create and switch branch
git checkout -b branch-name
```

### Branch Naming Convention
```
feat/feature-name
fix/bug-description
docs/documentation-update
refactor/code-improvement
chore/maintenance-task