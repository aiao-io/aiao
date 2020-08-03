import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, options: NestUniversalOptions) => {
  const { distPath, production } = options;

  if (!production) {
    const proxy = await import('./proxy-browser-sync-client');
    await proxy.proxyBrowserSyncClient(app, options);
  }

  app.register((instance: FastifyInstance, opts: any, next: () => void) => {
    instance.register(fastifyStatic, {
      prefixAvoidTrailingSlash: true,
      root: distPath,
      cacheControl: true,
      wildcard: '**/*.*',
      maxAge: '1y'
    });
    next();
  });
};
