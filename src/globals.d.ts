// src/globals.d.ts
export {};

declare global {
  interface Window {
    electron: import('./main/preload').ElectronHandler;
  }
}
