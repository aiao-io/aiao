import { Sequelize } from 'sequelize';
import { Connection, ConnectionOptions, EntityMetadata } from 'typeorm';

import { initRepository } from './init-repository';
import { translateTypeOrmEntity } from './translate-typeorm-entity';
import { translateTypeormOptions } from './translate-typeorm-options';

export class TypeormPlus {
  private entitiyMetadatas = new Set<EntityMetadata>();
  sequelize: Sequelize;

  constructor(options: Partial<ConnectionOptions>, connection?: Connection) {
    const opts = translateTypeormOptions(options);
    this.sequelize = new Sequelize(opts);

    if (connection) {
      connection.entityMetadatas.forEach(d => this.addMetadata(d));
    }
  }

  init() {
    console.log('this.entitiyMetadatas', this.entitiyMetadatas.size);

    console.log();
    console.log();
    console.log();
    this.entitiyMetadatas.forEach(metadata => initRepository(metadata, this.sequelize));
  }

  addMetadata(meta: EntityMetadata) {
    this.entitiyMetadatas.add(meta);
    console.log('addMetadata');
    const { modelName, attributes, options } = translateTypeOrmEntity(meta);
    return this.sequelize.define(modelName, attributes, options);
  }
}
