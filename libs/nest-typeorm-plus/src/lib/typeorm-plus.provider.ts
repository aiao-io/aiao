import { Connection } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';

import {
  AiaoTypeormPlusModuleConfig,
  ConnectionOptions,
  EntityClassOrSchema,
  NEST_TYPEORM_PLUS,
  NEST_TYPEORM_PLUS_MODULE_CONFIG
} from './interface';

export function createTypeormPlusProvider(connection?: ConnectionOptions): Provider {
  return {
    provide: NEST_TYPEORM_PLUS,
    useFactory: async (config: AiaoTypeormPlusModuleConfig, conn: Connection) => {
      const typeormPlus = new TypeormPlus();
      typeormPlus.addConnection(config, conn);
      return typeormPlus;
    },
    inject: [NEST_TYPEORM_PLUS_MODULE_CONFIG, getConnectionToken(connection)]
  };
}

export function createTypeormPlusFeatureProvider(
  entities: EntityClassOrSchema[] = [],
  connection?: ConnectionOptions
): Provider {
  return {
    provide: 'adsfasdf231231',
    useFactory: async (typeormPlus: TypeormPlus, conn: Connection) => {
      console.log(conn.name);
      // typeormPlus.addConnection(connection as any, conn);
    },
    inject: [NEST_TYPEORM_PLUS, getConnectionToken(connection)]
  };
}
