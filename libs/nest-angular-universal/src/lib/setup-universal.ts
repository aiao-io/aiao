import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, ops: NestUniversalOptions[]) =>
  ops.forEach(options => {
    const { fastifyStaticOptions, baseHref: prefix, ...fastilyEngineOpts } = options;
    app.register(
      (instance: FastifyInstance, opts: any, next: () => void) => {
        instance.register(fastifyStatic, {
          ...fastifyStaticOptions,
          root: fastilyEngineOpts.outputPath
        });
        instance.register(ngFastilyEngine, fastilyEngineOpts);
        next();
      },
      { prefix }
    );
  });
