import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import { existsSync } from 'fs';
import { join } from 'path';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

const promiseExistFile = (indexHtml: string) => {
  return new Promise(resolve => {
    const pt = () => {
      if (existsSync(indexHtml)) {
        resolve(true);
      } else {
        console.log(`waiting browser build`);
        setTimeout(() => {
          pt();
        }, 500);
      }
    };
    pt();
  });
};

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
    browserHost,
    browserPort
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

  if (!production) {
    if (locales && locales?.length > 0) {
      const proxy = await import('fastify-http-proxy');
      locales.forEach(locale => {
        app.register(proxy.default, {
          upstream: `http://${browserHost || 'localhost'}:${browserPort || 4200}/browser-sync/browser-sync-client.js`,
          prefix: `/${locale}/browser-sync/browser-sync-client.js`
        });
      });
      await promiseExistFile(join(distPath, defaultLocale || locales[0], 'index.html'));
    } else {
      await promiseExistFile(join(distPath, 'index.html'));
    }
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
