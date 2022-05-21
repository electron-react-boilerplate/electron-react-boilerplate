import { BrowserWindow, ipcMain } from 'electron';
import { Pool, ConnectionConfig } from '../connectPool';



enum siderEvents {
  // 新增连接
  addConnection = 'addConnection',
  // 关闭连接
  closeConnection = 'closeConnection',
  // 关闭所有连接
  closeAllConnection = 'closeAllConnection',
  // 测试连接
  testConnection = 'testConnection',
  // 获取连接的数据
  getConnectData = 'getConnectData',
}

// 监听侧边栏事件
export default class SiderEvent {
  window: BrowserWindow;
  connectPool: Pool
  constructor(win: BrowserWindow, connectPool: Pool) {
    this.window = win;
    this.connectPool = connectPool;
  }


  run () {

    ipcMain.on(siderEvents.addConnection, (_, config:ConnectionConfig) => {
      this.connectPool.addConnection(config);
    })

    ipcMain.on(siderEvents.closeConnection, (_, connectionName) => {
      this.connectPool.closeConnection(connectionName);
    })

    ipcMain.on(siderEvents.closeAllConnection, () => {
      this.connectPool.closeAllConnection();
    })

    ipcMain.on(siderEvents.testConnection, async (event, conf:ConnectionConfig) => {
      try {
        const is = await this.connectPool.testTempConnection(conf);
        console.log(is);
        event.reply('testConnection', is);
      } catch (err) {
        event.reply('testConnection', err);
      }
    })

    ipcMain.on(siderEvents.getConnectData, (event) => {
      event.reply('getConnectData', this.connectPool.getConnectionData());
    })

  }

}

