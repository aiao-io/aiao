import { Options, Sequelize } from 'sequelize';
import { Repository } from 'typeorm';

import { initRepository } from './init-repository';
import { translateTypeOrmEntity } from './translate-typeorm-entity';

export class TypeOrmSequelize extends Sequelize {
  private repositories = new Set<Repository<any>>();

  constructor(options?: Options) {
    super(options);
  }

  initRelations() {
    this.repositories.forEach(entity => initRepository(entity, this));
  }

  addTypeOrmModel(repository: Repository<any>) {
    this.repositories.add(repository);
    const { modelName, attributes, options } = translateTypeOrmEntity(repository);
    return this.define(modelName, attributes, options);
  }
}
