import type { ElectronAPI } from '../shared/electron-api';

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
