import { config } from 'dotenv';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';

try {
  config();
} catch {}

const {
  TYPEORM_PLUS_TEST_DB_TYPE,
  TYPEORM_PLUS_TEST_USERNAME,
  TYPEORM_PLUS_TEST_PASSWORD,
  TYPEORM_PLUS_TEST_DATABASE
} = env;

export const baseOptions: DataSourceOptions = {
  type: (TYPEORM_PLUS_TEST_DB_TYPE as any) || 'postgres',
  username: TYPEORM_PLUS_TEST_USERNAME || 'test',
  password: TYPEORM_PLUS_TEST_PASSWORD || 'test',
  database: TYPEORM_PLUS_TEST_DATABASE || 'test',
  synchronize: true
};
