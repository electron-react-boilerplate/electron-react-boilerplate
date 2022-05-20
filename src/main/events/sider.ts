import { BrowserWindow, ipcMain } from 'electron';
import { Pool } from '../connectPool';

// 监听侧边栏事件
export default class SiderEvent {
  window: BrowserWindow;
  connectPool: Pool
  constructor(win: BrowserWindow, connectPool: Pool) {
    this.window = win;
    this.connectPool = connectPool;
  }


  run () {

  }

}

