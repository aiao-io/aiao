import 'reflect-metadata';

import { FastifyReply } from 'fastify';

import {
  ArgumentsHost,
  DynamicModule,
  ExceptionFilter,
  HttpException,
  Inject,
  Module,
  OnModuleInit
} from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

import { NEST_ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { NestUniversalOptions } from './interface';
import { angularUniversalProviders } from './providers';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('--asdf-asd-f');
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    res.renderAngular().then(html => {
      res.type('tesxt/html').send(123123);
    });
  }
}
@Module({
  providers: [...angularUniversalProviders]
})
export class NestAngularUniversalModule implements OnModuleInit {
  constructor(
    @Inject(NEST_ANGULAR_UNIVERSAL_OPTIONS)
    private readonly options: NestUniversalOptions,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

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
          useClass: HttpExceptionFilter
        }
      ]
    };
  }

  async onModuleInit() {
    // const app = this.httpAdapterHost.httpAdapter.getInstance<FastifyAdapter>();
  }
}
