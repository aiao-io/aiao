import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createSequelizeProviders } from './entity.provider';
import { AiaoTypeormPlusModuleConfig, ConnectionOptions, EntityClassOrSchema } from './interface';
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

  static forFeature(entities: EntityClassOrSchema[] = [], connection?: ConnectionOptions): DynamicModule {
    AiaoNestTypeormPlusCoreModule.addEntities(entities, connection);
    const entityProvides = createSequelizeProviders(entities, connection);

    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forFeature(entities, connection)],
      providers: [...entityProvides],
      exports: [TypeOrmModule, ...entityProvides]
    };
  }
}
