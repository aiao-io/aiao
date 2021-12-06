import { join } from 'path';

/* eslint-disable */
// tslint:disable-next-line: nx-enforce-module-boundaries
import { NestAngularUniversalModule } from '@aiao/nest-angular-universal';
import { Module } from '@nestjs/common';

import { AppServerModule } from '../src/main.server';
import { AppController } from './app.controller';
import { AppGuard } from './app.guard';

@Module({
  imports: [
    NestAngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      outputPath: join(process.cwd(), 'dist/apps/dev-nest-angular-universal/browser')
    })
  ],
  providers: [AppGuard],
  controllers: [AppController]
})
export class AppModule {}
