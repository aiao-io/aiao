import { Connection, ConnectionOptions } from 'typeorm';

import { TypeormPlusNew } from '@aiao/typeorm-plus';
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
      useFactory: async (typeormPlus: TypeormPlusNew, conn: Connection) =>
        typeormPlus.getSequelizeRepository(entity, conn),
      inject: [NEST_TYPEORM_PLUS, getConnectionToken(connection)]
    };
  });
