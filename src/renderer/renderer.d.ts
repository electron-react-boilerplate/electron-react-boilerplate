export interface IElectronAPI {
  ipcRenderer: any;
  mainToRendererExample(message: string): void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
