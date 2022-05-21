import mysql from 'mysql'
import { join } from 'path'
import Store from "electron-store"
import { Pool, ConnectionConfig, Dataschema, Connect } from './type'

class ConnectionPoll implements Pool {
  pool: Map<string, Connect>
  appData: string
  appname: string
  store: Store

  readonly dataPath: string
  // 存储的文件名称
  static dataFileName: string = 'connections'
  // 加密密钥
  static readonly encryptionKey :string = '1234567890abcdefghijklmnopqrstuvwxyz'
  // 存储的kye
  static readonly storeKey: string = 'connections'

  constructor(appData: string, appname: string) {
    this.pool = new Map()
    this.appData = appData
    this.appname = appname
    this.dataPath = join(appData, appname ,ConnectionPoll.dataFileName)
    this.store = new Store({
      encryptionKey: ConnectionPoll.encryptionKey,
      cwd: ConnectionPoll.dataFileName,
    })
  }

  addConnection (config: ConnectionConfig) :Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const connection = mysql.createConnection(config)
      connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          this.pool.set(config.connectionName, [config, connection])
          this.setLocalData({
            [config.connectionName]: config
          })
          resolve(true)
        }
      })
    })
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

  getConnectionData () :Dataschema {
    const json: Dataschema = {}
    this.pool.forEach((connection, key) => {
      json[key] = connection[0]
    })
    return json
  }

  json () :string {
    return JSON.stringify(this.getConnectionData())
  }

  parseJSON (json: string) :Array<ConnectionConfig> {
    return JSON.parse(json)
  }

  save () {
    this.store.set(ConnectionPoll.storeKey ,this.json())
  }

  getLocalData () :Dataschema {
    return this.store.get(ConnectionPoll.storeKey) as Dataschema
  }

  setLocalData (data: Dataschema) {
    this.store.set(ConnectionPoll.storeKey, data)
  }
}

export default ConnectionPoll;
