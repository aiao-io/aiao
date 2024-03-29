import type { DataSource, DataSourceOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjectTypeormPlus } from './decorators';
import { AiaoTypeormPlusModuleConfig, EntityClassOrSchema, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { createTypeormPlusProvider } from './typeorm-plus.provider';
import { getTypeormPlusToken } from './utils';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static dataSourceEntities = new Map<string, Set<EntityClassOrSchema>>();

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlus) {}

  static addEntities(entities: EntityClassOrSchema[] = [], dataSource?: DataSource | DataSourceOptions | string) {
    const token = getTypeormPlusToken(dataSource);
    if (!this.dataSourceEntities.has(token)) {
      this.dataSourceEntities.set(token, new Set());
    }
    const set = this.dataSourceEntities.get(token)!;
    entities.forEach(entity => set.add(entity));
    return Array.from(set);
  }

  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    const entities: any = this.addEntities(config.entities, config as DataSource | DataSourceOptions | string);
    config = { ...config, entities };
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };
    const typeormPlusProvider = createTypeormPlusProvider(config as DataSourceOptions);

    return {
      module: AiaoNestTypeormPlusCoreModule,
      imports: [TypeOrmModule.forRoot(config)],
      providers: [configProvider, typeormPlusProvider],
      exports: [configProvider, typeormPlusProvider]
    };
  }

  async onModuleInit() {
    this.typeormPlus.init();
  }
}
