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
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  taskAPI: {
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    addTask: (task: any) => ipcRenderer.invoke('add-task', task),
    removeTask: (id: string) => ipcRenderer.invoke('remove-task', id),
    modifyTask: (id: string, property: string, value: any) =>
      ipcRenderer.invoke('modify-task', id, property, value),
  },
};


contextBridge.exposeInMainWorld('electron', electronHandler);


export type ElectronHandler = typeof electronHandler;
