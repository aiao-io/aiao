import { Dialect, Options } from 'sequelize';
import { ConnectionOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

/**
 * 转换 typeorm 配置
 * @param options
 */
export function translateTypeormOptions(options: Partial<ConnectionOptions>): Options {
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
