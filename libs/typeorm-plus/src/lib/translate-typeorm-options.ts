import { Options, Dialect } from 'sequelize';
import { ConnectionOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export function translateTypeormOptions(options: ConnectionOptions): Options {
  const { type } = options;
  const { host, port, username, password, database, ssl } = options as MysqlConnectionOptions;

  let dialect: Dialect;

  switch (type) {
    case 'mysql':
    case 'postgres':
    case 'sqlite':
    case 'mariadb':
    case 'mssql':
      dialect = type;
      break;
    default:
      throw new Error(`${type} not support`);
  }

  return {
    logging: false,
    host,
    port,
    dialect,
    username,
    password,
    database: database,
    ssl
  };
}
