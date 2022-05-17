import { app, BrowserWindow, shell, ipcMain, Tray } from 'electron';

import Mysql from './drive/index';

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

  // 新建连接
  ipcMain.on('createConnection', (event, arg) => {
    const con = new Mysql(arg);
    con.test().then(() => {
      event.reply('createConnection', true);
    }).catch((err) => {
      event.reply('createConnection', false, err);
    });
  })

}
