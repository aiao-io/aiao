import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, ops: NestUniversalOptions[]) => {
  ops.forEach(options => {
    const {
      bootstrap,
      distPath,
      document,
      documentFilePath,
      providers,
      fastifyStaticOptions,
      inlineCriticalCss,
      baseHref
    } = options;

    app.register(
      (instance: FastifyInstance, opts: any, next: () => void) => {
        instance.register(fastifyStatic, {
          ...fastifyStaticOptions,
          root: distPath
        });

        instance.register(ngFastilyEngine, {
          bootstrap,
          distPath,
          document,
          documentFilePath,
          providers,
          inlineCriticalCss,
          baseHref
        });

        next();
      },
      {
        prefix: baseHref
      }
    );
  });
};
