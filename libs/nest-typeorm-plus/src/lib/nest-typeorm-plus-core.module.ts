import { Repository } from 'typeorm';

import { TypeormPlusNew } from '@aiao/typeorm-plus';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjectTypeormPlus } from './decorators';
import { AiaoTypeormPlusModuleConfig, ConnectionOptions, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { createTypeormPlusProvider } from './typeorm-plus.provider';
import { getTypeOrmPlusConnectionToken } from './utils';

@Global()
@Module({})
export class AiaoNestTypeormPlusCoreModule {
  static connectionEntities = new Map<string, Set<Repository<any>>>();

  constructor(@InjectTypeormPlus() private typeormPlus: TypeormPlusNew) {}

  static addEntities(entities: any[] = [], connection?: ConnectionOptions) {
    const token = getTypeOrmPlusConnectionToken(connection) as string;
    if (!this.connectionEntities.has(token)) {
      this.connectionEntities.set(token, new Set());
    }
    const set = this.connectionEntities.get(token)!;
    entities.forEach(entity => set.add(entity));
    return Array.from(set);
  }

  static forRoot(config: AiaoTypeormPlusModuleConfig): DynamicModule {
    const entities: any = this.addEntities(config.entities, config as ConnectionOptions);
    config = { ...config, entities };
    const configProvider = { provide: NEST_TYPEORM_PLUS_MODULE_CONFIG, useValue: config };
    const typeormPlusProvider = createTypeormPlusProvider(config as any);

    return {
      module: AiaoNestTypeormPlusCoreModule,
      imports: [TypeOrmModule.forRoot(config)],
      providers: [configProvider, typeormPlusProvider],
      exports: [typeormPlusProvider]
    };
  }

  async onModuleInit() {
    this.typeormPlus.init();
  }
}
