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
  const { distPath, baseHref, browserHost, browserPort } = options;
  if (baseHref) {
    const fastifyHttpProxy = await import('fastify-http-proxy');
    // app.register(fastifyHttpProxy.default, {
    //   upstream: `http://${browserHost || 'localhost'}:${browserPort || 4200}/browser-sync/browser-sync-client.js`,
    //   prefix: `/${baseHref}/browser-sync/browser-sync-client.js`
    // });

    // app.register(fastifyHttpProxy.default, {
    //   upstream: `http://${browserHost || 'localhost'}:${browserPort || 4200}/en/styles.css`,
    //   prefix: `/styles.css`,
    //   http2: false // optional
    // });
  }
  await promiseExistFile(join(distPath, 'index.html'));
}
