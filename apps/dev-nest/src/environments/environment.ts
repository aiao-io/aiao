import { env } from 'process';

import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  production: false,
  appEnv: env['APP_ENV'] || 'dev',
  port: +(env['PORT'] || 3000),
  imports: [],
  providers: [],
  controllers: []
};
