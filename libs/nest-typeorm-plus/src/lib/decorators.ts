import { Connection, ConnectionOptions } from 'typeorm';

import { Inject } from '@nestjs/common';

import { EntityClassOrSchema } from './interface';
import { getSequelizeRepositoryToken, getTypeormPlusToken } from './utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectSequlizeRepository = (entity: EntityClassOrSchema, connection?: string) =>
  Inject(getSequelizeRepositoryToken(entity, connection));

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectTypeormPlus = (connection?: Connection | ConnectionOptions | string) =>
  Inject(getTypeormPlusToken(connection));
