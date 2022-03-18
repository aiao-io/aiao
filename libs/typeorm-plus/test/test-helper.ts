import { DataSourceOptions } from 'typeorm';

export const baseOptions: DataSourceOptions = {
  type: 'postgres',
  username: 'test',
  password: 'test',
  database: 'test',
  port: 3210,
  synchronize: true
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
