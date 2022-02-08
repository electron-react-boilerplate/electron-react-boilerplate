import { IpcRenderer } from 'electron';

type TypeReaddir = typeof readdir;
declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
    };
  }
}
