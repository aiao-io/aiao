import { Connection, ConnectionOptions } from 'typeorm';

import { Inject } from '@nestjs/common';

import { EntityClassOrSchema, getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectSequlizeRepository = (
  entity: EntityClassOrSchema,
  connection?: Connection | ConnectionOptions | string
) => {
  // TODO: featrue
  if (connection) {
    console.log(connection);
  }
  return Inject(getSequelizeRepositoryToken(entity));
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectTypeormPlus = () => Inject(NEST_TYPEORM_PLUS);
