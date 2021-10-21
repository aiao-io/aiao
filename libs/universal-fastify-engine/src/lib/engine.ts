import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { CommonEngine } from '@nguniversal/common/engine';

import { NgSetupOptions, RenderOptions } from './interface';
import { renderAngular } from './render-angular';

function fastifyAngularEngine(fastify: FastifyInstance, setupOptions: NgSetupOptions, next: () => void) {
  const { bootstrap } = setupOptions;
  const defaultProviders = setupOptions.providers || [];
  const engine = new CommonEngine(bootstrap, defaultProviders);
  fastify.decorateReply('renderAngular', async function (opts?: RenderOptions) {
    return renderAngular(engine, setupOptions, this.request, opts);
  });

  next();
}

// plugin
export const ngFastilyEngine = fastifyPlugin(fastifyAngularEngine, {
  fastify: '3.x',
  name: '@aiao/universal-fastify-engine'
});
