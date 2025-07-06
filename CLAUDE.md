# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Die Macht Zentrale is a monorepo containing multiple Electron and Next.js applications, organized as a TurboRepo with pnpm workspaces. The project is primarily focused on creating desktop applications with web-based interfaces.

## Architecture

### Monorepo Structure

This is a **pnpm workspace monorepo** managed by **TurboRepo** with the following organization:

- `apps/` - Main applications
  - `desktop/` - Electron desktop app that wraps Next.js dashboard
  - `dashboard/` - Next.js dashboard application (main UI, port 10000)
  - `github-notes/` - Next.js app for GitHub notes (port 10001)
- `services/` - Backend services and APIs
  - `api/` - API service layer
  - `github-service/` - GitHub integration service
- `packages/` - Shared packages and build tools
- `gutenberg/` - Documentation site (Docusaurus)

### Key Applications

**Desktop App (`apps/desktop/`)**
- Electron application that serves as a wrapper for the Next.js dashboard
- In development: loads `http://localhost:10000` (dashboard dev server)
- In production: loads static files copied from dashboard build (`out/`)
- Uses ports starting from 10000 to avoid conflicts
- Main process: `src/main/main.ts`
- Preload script: `src/main/preload.ts`

**Dashboard App (`apps/dashboard/`)**
- Next.js application that serves as the main UI
- Runs on port 10000 in development
- Built as static export for Electron production builds
- Uses shadcn/ui components

### Build System

**TurboRepo Configuration:**
- Uses dependency-aware task scheduling
- Build tasks depend on upstream dependencies (`^build`)
- Development tasks are persistent and uncached
- Package tasks generate distributable binaries

**PNPM Workspace:**
- Workspace dependencies use `workspace:*` protocol
- Centralized dependency management at root level
- Each app has its own specific dependencies

## Package Manager

This project uses **pnpm** as the package manager. Always use `pnpm` commands, not `npm` or `yarn`.

## Development Commands

### Starting Development

From the monorepo root:

```bash
# Install all dependencies
pnpm install

# Start all applications (dashboard + desktop)
pnpm dev

# Start only the desktop app (requires dashboard to be running)
pnpm desktop:start

# Start individual apps
cd apps/dashboard && pnpm dev
cd apps/desktop && pnpm start
```

### Building

```bash
# Build all packages and applications
pnpm build

# Build and package desktop app for distribution
pnpm desktop:package

# Build specific workspace
pnpm --filter=@die-macht-zentrale/desktop build
```

### Testing and Linting

```bash
# Run tests across all packages
pnpm test

# Run linting across all packages
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Desktop App Development Notes

### Development vs Production

- **Development**: Desktop app loads dashboard from `http://localhost:10000`
- **Production**: Desktop app uses static files copied from dashboard's `out/` directory

### Build Process for Desktop

1. Dashboard is built as static export (`next build && next export`)
2. Static files are copied to `apps/desktop/dist/renderer/` via `copy-dashboard.js`
3. Electron app is packaged with static files included

### Port Allocation

- Dashboard: 10000
- GitHub Notes: 10001
- Future apps: 10002+

This prevents port conflicts when running multiple applications.

### Dependencies

- Desktop app depends on dashboard being built for production packaging
- Uses `wait-on` package to ensure dashboard is ready before starting Electron
- Shared TypeScript configuration across workspace

## Key Configuration Files

- `pnpm-workspace.yaml` - Defines workspace packages
- `turbo.json` - TurboRepo task definitions and caching
- `package.json` (root) - Workspace scripts and shared dependencies
- `apps/desktop/scripts/copy-dashboard.js` - Static file copying for production builds

## Development Workflow

1. Start from monorepo root: `pnpm dev` starts both dashboard and desktop
2. Dashboard changes are immediately reflected in desktop app
3. For production testing: `pnpm desktop:package` creates distributable
4. Each app can be developed independently but desktop requires dashboard

## Important Notes

- Always run commands from monorepo root using TurboRepo when possible
- Desktop app build process requires dashboard to be built first
- Use workspace protocol (`workspace:*`) for internal package dependencies
- Applications use dedicated ports starting from 10000
- Development environment loads dashboard from localhost, production uses static files