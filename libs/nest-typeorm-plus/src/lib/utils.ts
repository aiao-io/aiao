import { DataSource, DataSourceOptions } from 'typeorm';

import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';

import { EntityClassOrSchema } from './interface';

export function getSequelizeRepositoryToken(
  entity: EntityClassOrSchema,
  dataSource?: DataSource | DataSourceOptions | string
): string {
  return `${getRepositoryToken(entity, dataSource)}_SEQUELIZE_REPOSITORY`;
}

export function getTypeormPlusToken(dataSource?: DataSource | DataSourceOptions | string): string {
  return `${getConnectionToken(dataSource)}_SEQUELIZE_CONNECTION`;
}
