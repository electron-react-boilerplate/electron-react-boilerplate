import mysql from 'mysql'

export interface ConnectionConfig {
  connectionName: string;
  port: number;
  host: string;
  user: string;
  password: string;
  connectType : "mysql" | "postgres"
}


type Connect = [ConnectionConfig, mysql.Connection]

export interface Pool {
  pool: Map<string, Connect>;

  // 添加连接
  addConnection(config: ConnectionConfig): void;

  // 获取连接
  getConnection(connectionName: string): mysql.Connection | undefined;

  // 关闭连接
  closeConnection(connectionName: string): void;

  // 关闭所有连接
  closeAllConnection(): void;

  // 测试连接 已有连接
  testConnection(connectionName: string): Promise<boolean>;
  // 测试临时连接
  testTempConnection : (conf: ConnectionConfig) => Promise<boolean>;

  getConnectionData(): Array<ConnectionConfig>

  json : () => string;

  parseJSON : (json: string) => Array<ConnectionConfig>;


}

class ConnectionPoll implements Pool {
  pool: Map<string, Connect> = new Map()
  constructor() {
    this.pool = new Map()
  }

  addConnection (config: ConnectionConfig) {
    const connection = mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    })
    this.pool.set(config.connectionName, [config, connection])
  }

  getConnection (connectionName: string) :mysql.Connection | undefined{
    const connection  = this.pool.get(connectionName)
    return connection ? connection[1] : undefined
  }


  closeConnection (connectionName: string) {
    const connection = this.pool.get(connectionName)
    if (connection) {
      connection[1].end()
    }
    this.pool.delete(connectionName)
  }

  closeAllConnection () {
    this.pool.forEach(connection => {
      connection[1].end()
    })
    this.pool.clear()
  }

  testTempConnection (conf: ConnectionConfig) :Promise<boolean> {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: conf.host,
        port: conf.port,
        user: conf.user,
        password: conf.password
      })
      connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  testConnection (connectionName: string) :Promise<boolean> {
    return new Promise((resolve, reject) => {
      const connection = this.pool.get(connectionName)
      if (connection) {
        connection[1].connect((err) => {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      } else {
        reject(new Error('connection not found'))
      }
    })
  }

  getConnectionData () :Array<ConnectionConfig> {
    const json: ConnectionConfig[] = []
    this.pool.forEach((connection) => {
      json.push(connection[0])
    })
    return json
  }

  json () :string {
    return JSON.stringify(this.getConnectionData())
  }

  parseJSON (json: string) :Array<ConnectionConfig> {
    return JSON.parse(json)
  }
}

export default ConnectionPoll;
