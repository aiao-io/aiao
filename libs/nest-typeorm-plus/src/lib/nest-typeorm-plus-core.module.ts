import { Connection, ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { createTypeormPlusConnection } from './connection.provider';
import { InjectTypeormPlus } from './decorators';
import { NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static entities: Set<Repository<any>> = new Set();
  static forRoot(config: TypeOrmModuleOptions): DynamicModule {
    const entities: any = [...(config.entities || []), ...Array.from(AiaoNestTypeormPlusCoreModule.entities)];
    config = { ...config, entities };
    const connectionProvider = createTypeormPlusConnection(config as ConnectionOptions);
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };

    return {
      module: AiaoNestTypeormPlusCoreModule,
      imports: [TypeOrmModule.forRoot(config)],
      providers: [configProvider, connectionProvider],
      exports: [connectionProvider]
    };
  }

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlus) {}

  async onModuleInit() {
    this.typeormPlus.init();
  }
}
