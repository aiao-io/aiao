import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

export const setupUniversal = async (app: FastifyInstance, options: NestUniversalOptions) => {
  const {
    bootstrap,
    defaultLocale,
    distPath,
    document,
    documentFilePath,
    locales,
    providers,
    production,
    fastifyStaticOptions
  } = options;

  app.register(ngFastilyEngine, {
    bootstrap,
    defaultLocale,
    distPath,
    document,
    documentFilePath,
    locales,
    providers
  });

  //  保证测试环境下 index.html 页面存在
  if (!production) {
    const { proxyBrowserSyncClient } = await import('./proxy-browser-sync-client');
    proxyBrowserSyncClient(app, options);
  }

  app.register((instance: FastifyInstance, opts: any, next: () => void) => {
    console.log('123123', distPath);
    instance.register(fastifyStatic, {
      ...fastifyStaticOptions,
      root: distPath,
      wildcard: true,
      decorateReply: false
    });
    next();
  });
};
