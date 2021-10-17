import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlusNew } from '@aiao/typeorm-plus';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';

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
      useFactory: async (typeormPlus: TypeormPlusNew, typeormEntity: Repository<any>, conn: Connection) =>
        typeormPlus.addMetadata(typeormEntity.metadata, conn),
      inject: [NEST_TYPEORM_PLUS, getRepositoryToken(entity, connection), getConnectionToken(connection)]
    };
  });
};
