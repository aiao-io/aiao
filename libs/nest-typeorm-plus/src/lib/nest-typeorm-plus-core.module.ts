import { ConnectionOptions, Repository } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { createTypeormPlusConnection } from './connection.provider';
import { InjectTypeormPlus } from './decorators';
import { NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { getTypeOrmPlusConnectionToken } from './utils';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static connectionEntities = new Map<string, Set<Repository<any>>>();

  static addEntities(entities: any[] = [], connection?: ConnectionOptions | string) {
    const token = getTypeOrmPlusConnectionToken(connection) as string;
    if (!this.connectionEntities.has(token)) {
      this.connectionEntities.set(token, new Set());
    }
    const connectionEntities = this.connectionEntities.get(token);
    entities.forEach(entity => connectionEntities!.add(entity));
    return Array.from(connectionEntities!);
  }

  static forRoot(config: TypeOrmModuleOptions): DynamicModule {
    const entities: any = this.addEntities(config.entities, config as ConnectionOptions);
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
