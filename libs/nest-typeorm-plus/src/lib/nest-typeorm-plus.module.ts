import { Repository, Connection, ConnectionOptions } from 'typeorm';

import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiaoTypeormPlusModuleConfig } from './interface';
import { AiaoNestTypeormPlusCoreModule } from './nest-typeorm-plus-core.module';

@Module({
  providers: [],
  exports: [],
})
export class AiaoTypeormPlusModule {
  static entities: Set<Repository<any>> = new Set();

  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    const entities = [...(config.entities || []), ...Array.from(AiaoNestTypeormPlusCoreModule.entities)];
    config = { ...config, entities };
    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forRoot(config), AiaoNestTypeormPlusCoreModule.forRoot(config)],
    };
  }

  static forFeature(entities: any[] = [], connection?: Connection | ConnectionOptions | string): DynamicModule {
    entities.forEach((d) => AiaoNestTypeormPlusCoreModule.entities.add(d));
    const entityProvides = createTypeOrmSequelizeProviders(entities, connection);
    return {
      module: OrmModule,
      imports: [TypeOrmModule.forFeature(entities, connection)],
      providers: [...entityProvides],
      exports: [TypeOrmModule, ...entityProvides],
    };
  }
}
