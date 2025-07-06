# Die Macht Zentrale Desktop App

> **Monorepo managed with [pnpm](https://pnpm.io) and [TurboRepo](https://turbo.build/repo)**
>
> - Install dependencies with `pnpm install` from the monorepo root.
> - Use turbo commands (e.g. `pnpm build`, `pnpm dev`) from the root for orchestrated tasks.
> - Each app uses dedicated ports starting from 10000 to avoid conflicts.

This is the Electron desktop application that uses the Next.js dashboard as its main interface.

## Development

### Prerequisites

- Node.js 18+ 
- [pnpm](https://pnpm.io/installation)

### Setup

1. Install dependencies from the monorepo root:
```bash
pnpm install
```

### Running in Development

Start both the Next.js dashboard and Electron app:

```bash
pnpm dev
```

This will:
- Start the Next.js dashboard on `http://localhost:10000`
- Wait for the dashboard to be ready
- Launch the Electron app that loads the dashboard

### Building for Production

Build the application for distribution:

```bash
pnpm run desktop:package
```

This will:
- Build the Next.js dashboard with static export
- Copy the static files to the Electron renderer directory
- Package the Electron app for distribution

## Architecture

- **Main Process**: Electron main process (`src/main/main.ts`)
- **Renderer**: Next.js dashboard served on port 10000 (dev) or static files (prod)
- **Preload**: Electron preload script for secure IPC communication

## Configuration

- Development: Electron loads `http://localhost:10000` (Next.js dev server)
- Production: Electron loads static files from `dist/renderer/` (Next.js export)

## Port Configuration

- **Dashboard**: Port 10000
- **GitHub Notes**: Port 10001
- **Other apps**: Ports 10002+

## Scripts

- `pnpm dev` - Start development environment (all apps)
- `pnpm build` - Build all apps
- `pnpm desktop:start` - Start only the desktop app
- `pnpm desktop:package` - Build and package the desktop app for distribution
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests 