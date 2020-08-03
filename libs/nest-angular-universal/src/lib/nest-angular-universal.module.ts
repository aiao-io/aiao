import 'reflect-metadata';

import { FastifyReply, FastifyRequest } from 'fastify';

import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ɵCommonEngine as CommonEngine } from '@nguniversal/common/engine';

import { NEST_ANGULAR_UNIVERSAL_OPTIONS } from './constants';
import { NestUniversalOptions } from './interface';
import { angularUniversalProviders } from './providers';

@Module({
  providers: [...angularUniversalProviders]
})
export class NestAngularUniversalModule implements OnModuleInit {
  engine: CommonEngine;
  constructor(
    @Inject(NEST_ANGULAR_UNIVERSAL_OPTIONS)
    private readonly options: NestUniversalOptions,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
    this.engine = new CommonEngine(options.bootstrap, options.providers || []);
  }

  static forRoot(options: NestUniversalOptions): DynamicModule {
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
      app.get('*', (req: FastifyRequest, res: FastifyReply) => res.renderAngular());
    }
  }
}
