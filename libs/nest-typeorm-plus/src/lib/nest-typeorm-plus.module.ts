import type { DataSource, DataSourceOptions } from 'typeorm';

import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forFeature(entities, dataSource)],
      providers: [],
      exports: [TypeOrmModule]
    };
  }
}
