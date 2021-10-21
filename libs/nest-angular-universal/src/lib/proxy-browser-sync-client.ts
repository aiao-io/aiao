import { FastifyInstance } from 'fastify';
import { existsSync } from 'fs';
import { join } from 'path';

import { Logger } from '@nestjs/common';

import { NestUniversalOptions } from './interface';

const promiseExistFile = (indexHtml: string) => {
  let maxTryCount = 5;
  return new Promise(resolve => {
    const browserIsBuild = () => {
      if (existsSync(indexHtml)) {
        resolve(true);
      } else {
        Logger.log('waiting browser build', 'NestAngularUniversalModule');
        setTimeout(() => {
          if (maxTryCount) {
            maxTryCount--;
            browserIsBuild();
          } else {
            Logger.log('browser not build', 'NestAngularUniversalModule');
          }
        }, 500);
      }
    };
    browserIsBuild();
  });
};

export async function proxyBrowserSyncClient(app: FastifyInstance, options: NestUniversalOptions) {
  const { defaultLocale, distPath, locales, browserHost, browserPort } = options;

  if (locales && locales.length > 0) {
    const fastifyHttpProxy = await import('fastify-http-proxy');
    locales.forEach(locale => {
      app.register(fastifyHttpProxy.default, {
        upstream: `http://${browserHost || 'localhost'}:${browserPort || 4200}/browser-sync/browser-sync-client.js`,
        prefix: `/${locale}/browser-sync/browser-sync-client.js`
      });
    });
    await promiseExistFile(join(distPath, defaultLocale || locales[0], 'index.html'));
  } else {
    await promiseExistFile(join(distPath, 'index.html'));
  }
}
