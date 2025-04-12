// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Opportunity, CustomField, Person } from '../helpers/types';
import ExcelJS from 'exceljs';

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

  readOnePager: async (
    selectedOpportunity: Opportunity, 
    customFieldsDict: Record<number, CustomField> | undefined,
    contact: Person | undefined
  ) => 
    ipcRenderer.invoke('read-one-pager', selectedOpportunity, customFieldsDict, contact),
  
  writeOnePager: (writtenFile: ExcelJS.Workbook) => ipcRenderer.invoke('write-one-pager', writtenFile)
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('env', {
  COPPER_API_KEY: process.env.COPPER_API_KEY
});

export type ElectronHandler = typeof electronHandler;
