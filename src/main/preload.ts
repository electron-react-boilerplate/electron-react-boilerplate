import { contextBridge, ipcRenderer } from 'electron';
import { IPC_PING } from '../shared/electron-api';
import type { ElectronAPI } from '../shared/electron-api';

const electronHandler: ElectronAPI = {
  ping: (message) => ipcRenderer.invoke(IPC_PING, message),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
