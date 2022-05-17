
import mysql from 'mysql'


class Mysql {
  connect : mysql.Connection;
  config : mysql.ConnectionConfig | string;
  constructor(connectionUri: string | mysql.ConnectionConfig) {
    this.config = connectionUri
    this.connect = mysql.createConnection(connectionUri)
  }

  // 测试连接
  async test() {
    return new Promise((resolve, reject) => {
      this.connect.connect((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}


export default Mysql;
