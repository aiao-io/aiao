import { Connection, ConnectionOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { getConnectionToken } from '@nestjs/typeorm';

import { EntityClassOrSchema, getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const createSequelizeRepositoryProviders = (
  entities: EntityClassOrSchema[] = [],
  connection?: Connection | ConnectionOptions | string
) =>
  entities.map(entity => {
    const provide = getSequelizeRepositoryToken(entity, connection);
    return {
      provide,
      useFactory: async (typeormPlus: TypeormPlus, conn: Connection) =>
        typeormPlus.getSequelizeRepository(entity),
      inject: [NEST_TYPEORM_PLUS, getConnectionToken(connection)]
    };
  });
