import { Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { InjectTypeormPlus } from './decorators';
import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { createTypeormPlusConnect } from './onnection.provider';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static entities: Set<Repository<any>> = new Set();

  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    const connectionProvider = createTypeormPlusConnect();
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };

    return {
      module: AiaoNestTypeormPlusCoreModule,
      providers: [configProvider, connectionProvider],
      exports: [configProvider, connectionProvider],
    };
  }

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlus) {}

  async onModuleInit() {
    this.typeormPlus.init();
  }
}
