import { Connection, ConnectionOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';

import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { getTypeormPlusToken } from './utils';

export function createTypeormPlusProvider(connection?: Connection | ConnectionOptions | string): Provider {
  return {
    provide: getTypeormPlusToken(connection),
    useFactory: async (config: AiaoTypeormPlusModuleConfig, conn: Connection) => new TypeormPlus(config, conn),
    inject: [NEST_TYPEORM_PLUS_MODULE_CONFIG, getConnectionToken(connection)]
  };
}
