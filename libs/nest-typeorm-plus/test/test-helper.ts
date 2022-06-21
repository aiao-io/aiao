import { DataSourceOptions } from 'typeorm';

export const baseOptions: DataSourceOptions = {
  type: 'postgres',
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true
};
