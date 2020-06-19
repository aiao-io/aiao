import { Connection, ConnectionOptions, EntitySchema } from 'typeorm';

import { getRepositoryToken, TypeOrmModuleOptions } from '@nestjs/typeorm';

export type AiaoTypeormPlusModuleConfig = TypeOrmModuleOptions & {
  entities?: EntityClassOrSchema[];
};

export const NEST_TYPEORM_PLUS_MODULE_CONFIG = 'NEST_TYPEORM_PLUS_MODULE_CONFIG';

export const NEST_TYPEORM_PLUS = 'NEST_TYPEORM_PLUS';

export function getSequelizeRepositoryToken(
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string
): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}
export type EntityClassOrSchema = Function | EntitySchema;
