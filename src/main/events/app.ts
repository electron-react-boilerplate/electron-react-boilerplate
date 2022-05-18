import { BrowserWindow, ipcMain } from 'electron';


export default class AppEvent {
  win: BrowserWindow;
  constructor(window: BrowserWindow) {
    this.win = window;
  }

  onClose() {
    this.win.close();
  }

  onMinimize() {
    this.win.minimize();
  }

  onMaximize() {
    this.win.maximize();
  }

  onRestore() {
    this.win.restore();
  }

  fullScreen() {
    this.win.setFullScreen(true);
  }

  fullScreenExit() {
    this.win.setFullScreen(false);
  }

  run () {
    ipcMain.on('onClose', () => {
      this.onClose();
    })

    ipcMain.on('onMinimize', () => {
      this.onMinimize();
    })

    ipcMain.on('onMaximize', () => {
      this.onMaximize();
    })

    ipcMain.on('onRestore', () => {
      this.onRestore();
    })

    ipcMain.on('fullScreen', () => {
      this.fullScreen();
    })

    ipcMain.on('fullScreenExit', () => {
      this.fullScreenExit();
    })

  }
}
