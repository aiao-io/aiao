import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createSequelizeRepositoryProviders } from './entity.provider';
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
    if (!connection) {
      AiaoNestTypeormPlusCoreModule.addEntities(entities);
    }
    const sequelizeRepositories = createSequelizeRepositoryProviders(entities, connection);

    return {
      module: AiaoTypeormPlusModule,
      imports: [TypeOrmModule.forFeature(entities, connection)],
      providers: [...sequelizeRepositories],
      exports: [TypeOrmModule, ...sequelizeRepositories]
    };
  }
}
