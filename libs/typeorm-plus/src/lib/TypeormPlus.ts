import { Sequelize } from 'sequelize';
import { ConnectionOptions, Connection, EntityMetadata } from 'typeorm';

import { initRepository } from './init-repository';
import { translateTypeOrmEntity } from './translate-typeorm-entity';
import { translateTypeormOptions } from './translate-typeorm-options';

export class TypeormPlus {
  private entitiyMetadatas = new Set<EntityMetadata>();
  sequelize: Sequelize;

  constructor(options: ConnectionOptions, connection?: Connection) {
    const opts = translateTypeormOptions(options);
    this.sequelize = new Sequelize(opts);

    if (connection) {
      connection.entityMetadatas.forEach(d => this.addModel(d));
    }
  }

  init() {
    this.entitiyMetadatas.forEach(metadata => initRepository(metadata, this.sequelize));
  }

  addModel(repository: any) {
    this.entitiyMetadatas.add(repository);
    const { modelName, attributes, options } = translateTypeOrmEntity(repository);
    return this.sequelize.define(modelName, attributes, options);
  }
}
