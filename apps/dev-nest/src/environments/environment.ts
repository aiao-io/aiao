import { env } from 'process';

import { AppTestController } from '../app/app-test.controller';
import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  production: false,
  appEnv: env['APP_ENV'] || 'dev',
  port: +(env['PORT'] || 3000),
  microservicePort: +(env['MICROSERVICE_PORT'] || 3001),
  imports: [],
  providers: [],
  controllers: [AppTestController],
  aliyun: {
    key: env['ALIBABA_CLOUD_ACCESS_KEY_ID'] || 'demo',
    secret: env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'] || 'demo'
  }
};
