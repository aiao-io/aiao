import { Connection } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';

import {
  AiaoTypeormPlusModuleConfig,
  ConnectionOptions,
  NEST_TYPEORM_PLUS,
  NEST_TYPEORM_PLUS_MODULE_CONFIG
} from './interface';

export function createTypeormPlusConnection(connection?: ConnectionOptions): Provider {
  return {
    provide: NEST_TYPEORM_PLUS,
    useFactory: async (options: AiaoTypeormPlusModuleConfig, conn: Connection) => new TypeormPlus(options, conn),
    inject: [NEST_TYPEORM_PLUS_MODULE_CONFIG, getConnectionToken(connection)]
  };
}
