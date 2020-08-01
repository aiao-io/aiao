import { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import { existsSync } from 'fs';
import { join } from 'path';

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
  const { defaultLocale, distPath, locales, production, browserHost, browserPort } = options;

  if (!production) {
    if (locales && locales?.length > 0) {
      const proxy = require('fastify-http-proxy');
      locales.forEach(locale => {
        app.register(proxy, {
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
      root: distPath,
      wildcard: '**/*',
      redirect: true,
      cacheControl: true,
      maxAge: '1y'
    });
    next();
  });
};
