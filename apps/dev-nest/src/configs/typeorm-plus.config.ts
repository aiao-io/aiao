import { env } from 'process';
import { DataSourceOptions } from 'typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

import { environment } from '../environments/environment';

// typeorm 的配置
export const typeormPlusConfig: DataSourceOptions & PostgresConnectionCredentialsOptions = {
  type: 'postgres',
  host: env['POSTGRES_HOST'],
  port: +(env['POSTGRES_PORT'] || 5432),
  username: env['POSTGRES_USERNAME'] || 'aiao_dev',
  password: env['POSTGRES_PASSWORD'] || 'aiao_dev',
  database: env['POSTGRES_DATABASE_NAME'] || 'aiao_dev',
  synchronize: !environment.production
};
