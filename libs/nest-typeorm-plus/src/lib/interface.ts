import { Options } from 'sequelize';
import { EntitySchema } from 'typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

export type AiaoTypeormPlusModuleConfig = TypeOrmModuleOptions & {
  sequelize: Options;
  entities: any[];
};

export const NEST_TYPEORM_PLUS_MODULE_CONFIG = 'NEST_TYPEORM_PLUS_MODULE_CONFIG';

export const NEST_TYPEORM_PLUS = 'NEST_TYPEORM_PLUS';

export function getSequelizeRepositoryToken(entity: any, connection?: any): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}
export type EntityClassOrSchema = Function | EntitySchema;
