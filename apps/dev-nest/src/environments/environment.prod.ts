import { env } from 'process';

import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  production: true,
  appEnv: env['APP_ENV'],
  port: +(env['PORT'] || 3000),
  imports: [],
  providers: [],
  controllers: []
};
