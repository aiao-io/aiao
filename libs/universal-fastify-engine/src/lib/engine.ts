import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { ɵCommonEngine as CommonEngine } from '@nguniversal/common/engine';

import { NgSetupOptions, RenderOptions } from './interface';
import { renderAngular } from './render-angular';

function fastifyAngularEngine(fastify: FastifyInstance, setupOptions: NgSetupOptions, next: () => void) {
  const { bootstrap } = setupOptions;
  const defaultProviders = setupOptions.providers || [];
  const engine = new CommonEngine(bootstrap, defaultProviders);

  fastify.decorateReply('renderAngular', async function (opts?: RenderOptions) {
    const html = await renderAngular(engine, setupOptions, this.request, opts);
    if (opts?.disableSend !== true) {
      this.type('text/html').send(html);
    }
    return html;
  });

  next();
}

// plugin
export const ngFastilyEngine = fastifyPlugin(fastifyAngularEngine, {
  fastify: '3.x',
  name: '@aiao/universal-fastify-engine'
});
