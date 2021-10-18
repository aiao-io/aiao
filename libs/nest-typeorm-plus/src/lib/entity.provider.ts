import { Connection, ConnectionOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';

import { EntityClassOrSchema } from './interface';
import { getSequelizeRepositoryToken, getTypeormPlusToken } from './utils';

export const createSequelizeRepositoryProviders = (
  entities: EntityClassOrSchema[] = [],
  connection?: Connection | ConnectionOptions | string
) =>
  entities.map(entity => {
    const provide = getSequelizeRepositoryToken(entity, connection);
    return {
      provide,
      useFactory: async (typeormPlus: TypeormPlus) => typeormPlus.getSequelizeRepository(entity),
      inject: [getTypeormPlusToken(connection)]
    };
  });
