const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: ipcRenderer.send,
    sendSync: ipcRenderer.sendSync,
    /**
     * You are still able to use ipcRenderer in a renderer process with contextIsolation set to true.
     * The contextBridge is what you want to use, although there is a current bug that is preventing from you calling ipcRenderer.on in a renderer process;
     * all you can do is send from the renderer process to the main process.
     * This code is taken from secure-electron-template a template for Electron built with security in mind.
     * You can find more info about this over here: https://stackoverflow.com/questions/55164360/with-contextisolation-true-is-it-possible-to-use-ipcrenderer
     */
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
