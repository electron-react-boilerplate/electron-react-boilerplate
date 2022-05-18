import { BrowserWindow, ipcMain } from 'electron';

// 监听侧边栏事件
export default class SiderEvent {
  window: BrowserWindow;
  constructor(win: BrowserWindow) {
    this.window = win;
  }


  run () {

  }

}

