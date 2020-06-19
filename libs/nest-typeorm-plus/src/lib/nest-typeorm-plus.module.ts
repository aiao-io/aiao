import { Connection, ConnectionOptions } from 'typeorm';

import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createSequelizeProviders } from './entity.provider';
import { AiaoTypeormPlusModuleConfig, EntityClassOrSchema } from './interface';
import { AiaoNestTypeormPlusCoreModule } from './nest-typeorm-plus-core.module';

@Module({
  providers: [],
  exports: []
})
export class AiaoTypeormPlusModule {
  static entities: Set<EntityClassOrSchema> = new Set();

  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    const entities: any = [...(config.entities || []), ...Array.from(AiaoNestTypeormPlusCoreModule.entities)];
    config = { ...config, entities };
    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forRoot(config), AiaoNestTypeormPlusCoreModule.forRoot(config)]
    };
  }

  static forFeature(entities: any[] = [], connection?: Connection | ConnectionOptions | string): DynamicModule {
    entities.forEach(d => AiaoNestTypeormPlusCoreModule.entities.add(d));
    const entityProvides = createSequelizeProviders(entities, connection);
    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forFeature(entities, connection)],
      providers: [...entityProvides],
      exports: [TypeOrmModule, ...entityProvides]
    };
  }
}
