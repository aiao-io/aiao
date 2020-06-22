import { Connection } from 'typeorm';

import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';

import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS, NEST_TYPEORM_PLUS_MODULE_CONFIG } from './interface';

export function createTypeormPlusConnect(connection?: Connection): Provider {
  return {
    provide: NEST_TYPEORM_PLUS,
    useFactory: async (options: AiaoTypeormPlusModuleConfig) => {
      return new TypeormPlus(options, connection);
    },
    inject: [NEST_TYPEORM_PLUS_MODULE_CONFIG]
  };
}
