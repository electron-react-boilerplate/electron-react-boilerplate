// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    removeListener: (channel: Channels, func: (...args: unknown[]) => void) => {
      ipcRenderer.removeListener(channel, func);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    saveGCode(generatedCodes: string[]) {
      return ipcRenderer.invoke('save-gcode', generatedCodes);
    },
    openFile(filePath: string) {
      return ipcRenderer.invoke('open-file', filePath);
    },
    checkFile(filePath: string) {
      return ipcRenderer.invoke('check-file', filePath);
    },
    saveFile(content: string, filePath: string) {
      return ipcRenderer.invoke('save-file', content, filePath);
    },
    saveFileAs(content: string) {
      return ipcRenderer.invoke('save-file-as', content);
    },
    quitApp() {
      return ipcRenderer.invoke('quit-app');
    },
  },
  store: {
    get(key: any) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: any, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
