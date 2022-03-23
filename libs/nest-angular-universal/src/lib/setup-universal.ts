import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, nestUniversalOptions: NestUniversalOptions[]) => {
  app.register(ngFastilyEngine, nestUniversalOptions);
  nestUniversalOptions.forEach(options => {
    const { fastifyStaticOptions, baseHref: prefix, ...fastilyEngineOpts } = options;
    app.register(
      (instance: FastifyInstance, opts: any, next: () => void) => {
        instance.register(fastifyStatic, {
          wildcard: false,
          ...fastifyStaticOptions,
          root: fastilyEngineOpts.outputPath
        });
        next();
      },
      { prefix }
    );
  });
};
