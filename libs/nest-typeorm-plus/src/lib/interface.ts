import { Connection as TypeOrmConnection, ConnectionOptions as TypeOrmConnectionOptions, EntitySchema } from 'typeorm';

import { Type } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModuleOptions } from '@nestjs/typeorm';

export type AiaoTypeormPlusModuleConfig = TypeOrmModuleOptions & {
  entities?: EntityClassOrSchema[];
};

export const NEST_TYPEORM_PLUS_MODULE_CONFIG = 'NEST_TYPEORM_PLUS_MODULE_CONFIG';

export const NEST_TYPEORM_PLUS = 'NEST_TYPEORM_PLUS';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityClassOrSchema = Function | EntitySchema;
export type ConnectionOptions = TypeOrmConnection | TypeOrmConnectionOptions | string;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ConnectionTokenType = string | Function | Type<TypeOrmConnection>;

export function getSequelizeRepositoryToken(entity: EntityClassOrSchema, connection?: ConnectionOptions): string {
  return `${getRepositoryToken(entity, connection)}_SEQUELIZE_REPOSITORY`;
}
