import { Connection, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { createTypeormPlusConnect } from './connection.provider';
import { InjectTypeormPlus } from './decorators';
import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static entities: Set<Repository<any>> = new Set();

  static forRoot(config: AiaoTypeormPlusModuleConfig, connection?: Connection): DynamicModule {
    const connectionProvider = createTypeormPlusConnect(connection);
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };

    return {
      module: AiaoNestTypeormPlusCoreModule,
      providers: [configProvider, connectionProvider],
      exports: [configProvider, connectionProvider]
    };
  }

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlus) {}

  async onModuleInit() {
    this.typeormPlus.init();
  }
}
