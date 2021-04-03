const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('dev', {
  isRunning: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
});
