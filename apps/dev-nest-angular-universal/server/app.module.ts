import { join } from 'path';

/* eslint-disable */
// tslint:disable-next-line: nx-enforce-module-boundaries
import { NestAngularUniversalModule } from '@aiao/nest-angular-universal';
import { Module } from '@nestjs/common';

import { environment } from '../src/environments/environment';
import { AppServerModule } from '../src/main.server';
import { AppController } from './app.controller';
import { AppGuard } from './app.guard';

let documentFilePath: string | undefined;
const outputPath = join(__dirname, '..', 'browser');

if (environment.production) {
  documentFilePath = join(outputPath, 'index.html');
}

@Module({
  imports: [
    NestAngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      outputPath,
      documentFilePath
    })
  ],
  providers: [AppGuard],
  controllers: [AppController]
})
export class AppModule {}
