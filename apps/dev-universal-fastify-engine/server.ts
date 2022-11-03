import 'zone.js/node';

import fastify from 'fastify';
import { join } from 'path';

import { ngFastilyEngine } from '@aiao/universal-fastify-engine';
import fastifyStatic from '@fastify/static';

import { AppServerModule } from './src/main.server';

export function createApp() {
  const app = fastify();
  const distFolder = join(process.cwd(), 'dist/apps/dev-universal-fastify-engine/browser');

  app.register(fastifyStatic, {
    root: distFolder,
    decorateReply: false
  });

  app.register(ngFastilyEngine, {
    outputPath: distFolder,
    bootstrap: AppServerModule
  });

  app.get('/api/hello', (req, reply) => {
    reply.send({
      name: 'aiao'
    });
  });

  app.setNotFoundHandler((request, reply) => reply.renderAngular());

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
