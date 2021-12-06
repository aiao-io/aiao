import { Connection, ConnectionOptions } from 'typeorm';

import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';

import { EntityClassOrSchema } from './interface';

export function getSequelizeRepositoryToken(
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string
): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}

export function getTypeormPlusToken(connection?: Connection | ConnectionOptions | string): string {
  return `${getConnectionToken(connection)}_SEQUELIZE_CONNECTION`;
}
