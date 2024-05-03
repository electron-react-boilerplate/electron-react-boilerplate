interface Window {
  electron: {
    ipcRenderer: any;
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };
  };
}

declare module '*.module.css';
declare module '*.module.styl';
declare module '*.png' {
  const value: any;
  export default value;
}
