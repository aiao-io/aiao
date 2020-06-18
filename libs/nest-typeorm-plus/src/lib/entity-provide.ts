import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { getRepositoryToken } from '@nestjs/typeorm';

import { getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const createTypeOrmSequelizeProviders = (
  entities: Function[] = [],
  connection?: Connection | ConnectionOptions | string
) => {
  return entities.map((entity) => ({
    provide: getSequelizeRepositoryToken(entity, connection),
    useFactory: async (typeormPlus: TypeormPlus, typeormEntity: Repository<any>) => {
      return typeormPlus.addMetadata(typeormEntity.metadata);
    },
    inject: [NEST_TYPEORM_PLUS, getRepositoryToken(entity, connection)],
  }));
};
