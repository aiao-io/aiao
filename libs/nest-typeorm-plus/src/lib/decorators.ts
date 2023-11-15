import type { DataSource, DataSourceOptions } from 'typeorm';

import { Inject } from '@nestjs/common';

import { EntityClassOrSchema } from './interface';
import { getSequelizeRepositoryToken, getTypeormPlusToken } from './utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectSequlizeRepository = (entity: EntityClassOrSchema, dataSource?: string) =>
  Inject(getSequelizeRepositoryToken(entity, dataSource));

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectTypeormPlus = (dataSource?: DataSource | DataSourceOptions | string) =>
  Inject(getTypeormPlusToken(dataSource));
