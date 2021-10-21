import { join } from 'path';

/* eslint-disable */
// tslint:disable-next-line: nx-enforce-module-boundaries
import { NestAngularUniversalModule } from '@aiao/nest-angular-universal';
import { Module } from '@nestjs/common';

import { AppServerModule } from '../src/main.server';
import { AppController } from './app.controller';

@Module({
  imports: [
    NestAngularUniversalModule.forRoot(
      {
        bootstrap: AppServerModule,
        baseHref: '/en/',
        distPath: join(process.cwd(), 'dist/apps/dev-nest-angular-universal/browser')
      },
      {
        bootstrap: AppServerModule,
        baseHref: '/cn/',
        distPath: join(process.cwd(), 'dist/apps/dev-nest-angular-universal/browser')
      }
    )
  ],
  controllers: [AppController]
})
export class AppModule {}
