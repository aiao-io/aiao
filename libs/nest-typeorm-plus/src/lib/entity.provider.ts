import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EntityClassOrSchema, getSequelizeRepositoryToken, NEST_TYPEORM_PLUS } from './interface';

export const createSequelizeProviders = (
  entities: EntityClassOrSchema[] = [],
  connection?: Connection | ConnectionOptions | string
) => {
  // TODO: featrue
  if (connection) {
    console.log(connection);
  }
  return entities.map(entity => {
    const provide = getSequelizeRepositoryToken(entity, connection);
    return {
      provide,
      useFactory: async (typeormPlus: TypeormPlus, typeormEntity: Repository<any>) =>
        typeormPlus.addMetadata(typeormEntity.metadata),
      inject: [NEST_TYPEORM_PLUS, getRepositoryToken(entity, connection)]
    };
  });
};
