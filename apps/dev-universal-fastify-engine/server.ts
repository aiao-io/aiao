import 'zone.js/node';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';

import { AppServerModule } from './src/main.server';

export function createApp() {
  const app = fastify();
  const distFolder = join(process.cwd(), 'dist/apps/dev-universal-fastify-engine/browser');
  app.register(ngFastilyEngine, {
    distPath: distFolder,
    bootstrap: AppServerModule
  });

  app.register(fastifyStatic, {
    root: distFolder,
    decorateReply: false
  });

  app.get('/api/hello', (req, reply) => {
    reply.send({
      name: 'aiao'
    });
  });

  app.setNotFoundHandler(async (request, reply) => {
    try {
      console.log('123', await reply.renderAngular());
    } catch (error) {
      console.log(error);
    }
    // reply.renderAngular();
    reply.send('123');
  });

  return app;
}

function run() {
  const port = +(process.env.PORT || 4000);
  const app = createApp();
  app.listen(port, () => {
    console.log(`Node server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
