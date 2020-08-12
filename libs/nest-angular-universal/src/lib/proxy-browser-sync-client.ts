import { FastifyInstance } from 'fastify';
import proxy from 'fastify-http-proxy';
import { existsSync } from 'fs';
import { join } from 'path';

import { NestUniversalOptions } from './interface';

const promiseExistFile = (indexHtml: string) => {
  let maxTryCount = 5;
  return new Promise(resolve => {
    const browserIsBuild = () => {
      if (existsSync(indexHtml)) {
        resolve(true);
      } else {
        console.log(`waiting browser build`);
        setTimeout(() => {
          if (maxTryCount) {
            maxTryCount--;
            browserIsBuild();
          } else {
            console.log(`browser not build`);
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
