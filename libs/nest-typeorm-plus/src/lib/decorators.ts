import { Connection, ConnectionOptions } from 'typeorm';

import { Inject } from '@nestjs/common';

import { EntityClassOrSchema, getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const InjectSequlizeRepository = (
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string
) => Inject(getSequelizeRepositoryToken(entity));

export const InjectTypeormPlus = () => Inject(NEST_TYPEORM_PLUS);
