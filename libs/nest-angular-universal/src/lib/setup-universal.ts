import { FastifyInstance } from 'fastify';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';
import fastifyStatic from '@fastify/static';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, nestUniversalOptions: NestUniversalOptions[]) => {
  app.register(ngFastilyEngine, nestUniversalOptions);
  nestUniversalOptions.forEach(options => {
    const { fastifyStaticOptions, baseHref: prefix, ...fastilyEngineOpts } = options;
    app.register(fastifyStatic, {
      ...fastifyStaticOptions,
      root: fastilyEngineOpts.outputPath,
      prefix,
      wildcard: false
    });
  });
};
