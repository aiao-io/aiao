import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { getRepositoryToken } from '@nestjs/typeorm';

import { getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const createSequelizeProviders = (
  entities: Function[] = [],
  connection?: Connection | ConnectionOptions | string
) => {
  return entities.map(entity => {
    return {
      provide: getSequelizeRepositoryToken(entity, connection),
      useFactory: async (typeormPlus: TypeormPlus, typeormEntity: Repository<any>) =>
        typeormPlus.addMetadata(typeormEntity.metadata),
      inject: [NEST_TYPEORM_PLUS, getRepositoryToken(entity, connection)]
    };
  });
};
