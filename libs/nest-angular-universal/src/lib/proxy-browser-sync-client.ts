import { FastifyInstance } from 'fastify';
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

export async function proxyBrowserSyncClient(app: FastifyInstance, options: NestUniversalOptions) {
  const { defaultLocale, distPath, locales, production, browserHost, browserPort } = options;

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
