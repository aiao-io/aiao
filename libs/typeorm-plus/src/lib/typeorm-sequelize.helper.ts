import { ModelType, Sequelize } from 'sequelize';
import { Connection, ConnectionOptions, EntityMetadata, EntitySchema } from 'typeorm';

import { initRepository } from './init-repository';
import { SequelizeRepository } from './interface';
import { translateTypeOrmEntity } from './translate-typeorm-entity';
import { translateTypeormOptions } from './translate-typeorm-options';

// eslint-disable-next-line @typescript-eslint/ban-types
type EntityKeys = Function | string | EntitySchema<any>;

export class TypeormSequelizeHelper {
  protected entitiyMetadatas = new Set<EntityMetadata>();
  protected entitiyMap = new Map<EntityKeys, string>();
  isInit = false;
  sequelize: Sequelize;

  constructor(options: Partial<ConnectionOptions>, connection: Connection) {
    const opts = translateTypeormOptions(options);
    this.sequelize = new Sequelize(opts);
    if (connection) {
      connection.entityMetadatas.forEach(d => this.addMetadata(d));
    }
  }

  getRepository<Entity>(entity: EntityKeys): SequelizeRepository<Entity> {
    if (!this.isInit) {
      this.init();
    }
    if (this.entitiyMap.has(entity)) {
      const name = this.entitiyMap.get(entity)!;
      return this.sequelize.model(name) as any;
    }
    throw new Error(`Model ${entity} not found`);
  }

  init() {
    if (!this.isInit) {
      this.isInit = true;
      this.entitiyMetadatas.forEach(metadata => initRepository(metadata, this.sequelize));
    }
  }

  addMetadata(meta: EntityMetadata): ModelType {
    this.entitiyMetadatas.add(meta);
    const { modelName, attributes, options } = translateTypeOrmEntity(meta);
    this.entitiyMap.set(meta.target, modelName);
    return this.sequelize.define(modelName, attributes, options);
  }
}
