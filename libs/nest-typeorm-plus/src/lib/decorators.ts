import type { DataSource, DataSourceOptions } from 'typeorm';

import { Inject } from '@nestjs/common';

import { getTypeormPlusToken } from './utils';

export const InjectTypeormPlus = (
  dataSource?: DataSource | DataSourceOptions | string
) => Inject(getTypeormPlusToken(dataSource));
