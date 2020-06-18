import { TypeormPlus } from '@aiao/typeorm-plus';
import { Provider } from '@nestjs/common';

import { AiaoTypeormPlusModuleConfig, NEST_TYPEORM_PLUS } from './interface';

export function createTypeormPlusConnect(): Provider {
  return {
    provide: '',
    useFactory: async (options: AiaoTypeormPlusModuleConfig) => {
      return new TypeormPlus(options);
    },
    inject: [NEST_TYPEORM_PLUS],
  };
}
