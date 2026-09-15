import { ElectronHandler } from '../shared/electron-handler';

declare global {
  interface Window {
    electron: ElectronHandler;
  }
}

export {};
