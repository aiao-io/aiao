import { env } from 'process';

import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  production: true,
  appEnv: env['APP_ENV'],
  port: +(env['PORT'] || 3000),
  microservicePort: +(env['MICROSERVICE_PORT'] || 3001),
  imports: [],
  providers: [],
  controllers: [],
  aliyun: {
    key: env['ALIBABA_CLOUD_ACCESS_KEY_ID'] || '',
    secret: env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'] || ''
  }
};
