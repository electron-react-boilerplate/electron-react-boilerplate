
import mysql from 'mysql'

export interface ConnectionConfig {
  connectionName: string;
  port: number;
  host: string;
  user: string;
  password: string;
  connectType : "mysql" | "postgres"
}

export type Dataschema = {
  [connectionName: string]: ConnectionConfig
}

export type Connect = [ConnectionConfig, mysql.Connection]


export interface Pool {
  pool: Map<string, Connect>;

  // 添加连接
  addConnection(config: ConnectionConfig): Promise<boolean>;

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

  getConnectionData(): Dataschema

  json : () => string;

  parseJSON : (json: string) => Array<ConnectionConfig>;

  save : () => void;

  getLocalData : () => Dataschema

}
