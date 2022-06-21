import type { DataSource, DataSourceOptions } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';
import { getTypeormPlusToken } from './utils';

export function createTypeormPlusProvider(dataSource?: DataSource | DataSourceOptions | string): Provider {
  return {
    provide: getTypeormPlusToken(dataSource),
    useFactory: async (config: AiaoTypeormPlusModuleConfig, conn: DataSource) => new TypeormPlus(config, conn),
    inject: [NEST_TYPEORM_PLUS_MODULE_CONFIG, getDataSourceToken(dataSource)]
  };
}
