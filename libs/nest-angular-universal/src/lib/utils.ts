import { FastifyInstance } from 'fastify';
import { nextCallback } from 'fastify-plugin';
import fastifyStatic from 'fastify-static';
import { existsSync } from 'fs';
import { join } from 'path';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { NestUniversalOptions } from './interface';

const promiseExistFile = (indexHtml: string) => {
  return new Promise(resolve => {
    let timer: any;
    const pt = () => {
      if (existsSync(indexHtml)) {
        resolve(true);
      } else {
        console.log(`waiting browser build`);
        timer = setTimeout(() => {
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
    if (locales?.length > 0) {
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

  app.register((instance: FastifyInstance, opts: any, next: nextCallback) => {
    instance.register(fastifyStatic, {
      prefix: '/',
      wildcard: '**/*',
      root: distPath,
      redirect: true,
      index: false,
      cacheControl: true,
      maxAge: '1y'
    });
    next();
  });
};
