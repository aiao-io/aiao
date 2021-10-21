import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { NEST_ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { HttpException404Filter } from './http-exception-404.filter';
import { NestUniversalOptions } from './interface';
import { angularUniversalProviders } from './providers';

@Module({
  providers: [...angularUniversalProviders]
})
export class NestAngularUniversalModule {
  static forRoot(options: NestUniversalOptions): DynamicModule {
    return {
      module: NestAngularUniversalModule,
      providers: [
        {
          provide: NEST_ANGULAR_UNIVERSAL_OPTIONS,
          useValue: options
        },
        {
          provide: APP_FILTER,
          useClass: HttpException404Filter
        }
      ]
    };
  }
}
