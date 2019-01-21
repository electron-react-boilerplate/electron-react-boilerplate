export const CREATE_DATABASE = 'CREATE_DATABASE';

export function createDatabase(options) {
  return {
    type: CREATE_DATABASE,
    dialect: options.dialect,
    hostname: options.hostname,
    port: options.port,
    database: options.database
  };
}
