import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, options: NestUniversalOptions) => {
  const {
    bootstrap,
    distPath,
    document,
    documentFilePath,
    providers,
    production,
    fastifyStaticOptions,
    inlineCriticalCss,
    baseHref
  } = options;

  app.register(ngFastilyEngine, {
    bootstrap,
    distPath,
    document,
    documentFilePath,
    providers,
    inlineCriticalCss
  });

  //  保证测试环境下 index.html 页面存在
  if (!production) {
    const { proxyBrowserSyncClient } = await import('./proxy-browser-sync-client');
    proxyBrowserSyncClient(app, options);
  }

  app.register((instance: FastifyInstance, opts: any, next: () => void) => {
    instance.register(fastifyStatic, {
      ...fastifyStaticOptions,
      root: distPath,
      prefix: baseHref
    });
    next();
  });
};
