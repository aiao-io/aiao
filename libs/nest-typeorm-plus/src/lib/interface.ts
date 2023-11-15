import { EntitySchema } from 'typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type AiaoTypeormPlusModuleConfig = TypeOrmModuleOptions & {
  entities?: EntityClassOrSchema[];
};

export const NEST_TYPEORM_PLUS_MODULE_CONFIG =
  'NEST_TYPEORM_PLUS_MODULE_CONFIG';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityClassOrSchema = Function | EntitySchema;
