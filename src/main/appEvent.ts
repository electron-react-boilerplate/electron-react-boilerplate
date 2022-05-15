import { app, BrowserWindow, shell, ipcMain, Tray } from 'electron';

export function InitAppEvents (win: BrowserWindow) {
  ipcMain.on('onClose', () => {
    win.close();
  });
  ipcMain.on('onMinimize', () => {
    win.minimize();
  })

  ipcMain.on('onMaximize', () => {
    win.maximize();
  })

  ipcMain.on('onRestore', () => {
    win.restore();
  })

  ipcMain.on('fullScreen', () => {
    win.setFullScreen(true);
  })

  ipcMain.on('fullScreenExit', () => {
    win.setFullScreen(false);
  })

}
