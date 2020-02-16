import 'reflect-metadata';

import { FastifyReply, FastifyRequest } from 'fastify';

import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { NEST_ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { NgUniversalFastifyOptions } from './interface';
import { angularUniversalProviders } from './providers';

@Module({
  providers: [...angularUniversalProviders]
})
export class NestAngularUniversalModule implements OnModuleInit {
  constructor(
    @Inject(NEST_ANGULAR_UNIVERSAL_OPTIONS)
    private readonly options: NgUniversalFastifyOptions,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  static forRoot(options: NgUniversalFastifyOptions): DynamicModule {
    return {
      module: NestAngularUniversalModule,
      providers: [
        {
          provide: NEST_ANGULAR_UNIVERSAL_OPTIONS,
          useValue: options
        }
      ]
    };
  }

  async onModuleInit() {
    if (!this.httpAdapterHost) {
      return;
    }

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    if (!httpAdapter) {
      return;
    }

    const { disableRender } = this.options;

    if (!disableRender) {
      const app: any = httpAdapter.getInstance();
      app.get('*', (req: FastifyRequest, replay: FastifyReply<Response>) => replay.renderAngular());
    }
  }
}
