import { DataSource, DataSourceOptions } from 'typeorm';

import { getDataSourceToken } from '@nestjs/typeorm';

export function getTypeormPlusToken(dataSource?: DataSource | DataSourceOptions | string): string {
  return `${getDataSourceToken(dataSource)}_SEQUELIZE_CONNECTION`;
}
