import type { DataSource, DataSourceOptions } from 'typeorm';

import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createSequelizeRepositoryProviders } from './entity.provider';
import { AiaoTypeormPlusModuleConfig, EntityClassOrSchema } from './interface';
import { AiaoNestTypeormPlusCoreModule } from './nest-typeorm-plus-core.module';

@Module({
  providers: [],
  exports: []
})
export class AiaoTypeormPlusModule {
  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    return {
      module: AiaoTypeormPlusModule,
      imports: [AiaoNestTypeormPlusCoreModule.forRoot(config)]
    };
  }

  static forFeature(
    entities: EntityClassOrSchema[] = [],
    dataSource?: DataSource | DataSourceOptions | string
  ): DynamicModule {
    AiaoNestTypeormPlusCoreModule.addEntities(entities, dataSource);
    const sequelizeRepositories = createSequelizeRepositoryProviders(entities, dataSource);
    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forFeature(entities, dataSource)],
      providers: [...sequelizeRepositories],
      exports: [TypeOrmModule, ...sequelizeRepositories]
    };
  }
}
