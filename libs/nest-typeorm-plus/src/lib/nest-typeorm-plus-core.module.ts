import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { createTypeormPlusConnect } from './connection.provider';
import { InjectTypeormPlus } from './decorators';
import { createSequelizeProviders } from './entity.provider';
import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static entities: Set<Repository<any>> = new Set();

  static forRoot(
    config: AiaoTypeormPlusModuleConfig,
    connection?: Connection | ConnectionOptions | string
  ): DynamicModule {
    let entityProvides = [];

    if (config?.entities?.length > 0) {
      config.entities.forEach(d => AiaoNestTypeormPlusCoreModule.entities.add(d as any));
      entityProvides = createSequelizeProviders(config.entities as any, connection);
      console.log('entityProvides', entityProvides);
    }
    const connectionProvider = createTypeormPlusConnect();
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };

    return {
      module: AiaoNestTypeormPlusCoreModule,
      providers: [configProvider, connectionProvider, ...entityProvides],
      exports: [configProvider, connectionProvider, ...entityProvides]
    };
  }

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlus) {}

  async onModuleInit() {
    console.log('onModuleInit');
    this.typeormPlus.init();
  }
}
