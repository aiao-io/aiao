import { DataSource, DataSourceOptions } from 'typeorm';

import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';

import { EntityClassOrSchema } from './interface';

export function getSequelizeRepositoryToken(
  entity: EntityClassOrSchema,
  connection?: DataSource | DataSourceOptions | string
): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}

export function getTypeormPlusToken(connection?: DataSource | DataSourceOptions | string): string {
  return `${getConnectionToken(connection)}_SEQUELIZE_CONNECTION`;
}
