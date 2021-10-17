import { isString } from 'lodash';
import { Connection, ConnectionOptions } from 'typeorm';

import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';

import { EntityClassOrSchema } from './interface';

export function getTypeOrmPlusConnectionToken(connection?: Connection | ConnectionOptions | string) {
  let connectionName = 'default';
  if (isString(connection)) {
    connectionName = connection;
  } else if (connection && connection.name) {
    connectionName = connection.name;
  }
  return `${connectionName}_connection_typeorm_plus`;
}

export function getSequelizeRepositoryToken(
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string
): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}

export function getTypeormPlusToken(connection?: Connection | ConnectionOptions | string): string {
  return `${getConnectionToken(connection)}_SEQUELIZE_CONNECTION`;
}
