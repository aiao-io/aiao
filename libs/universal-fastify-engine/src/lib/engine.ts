import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { NgSetupOptions, RenderOptions } from './interface';
import { renderAngular } from './render-angular';

function fastifyAngularEngine(
  fastify: FastifyInstance,
  setupOptions: NgSetupOptions | NgSetupOptions[],
  next: () => void
) {
  fastify.decorateReply('renderAngular', function (opts?: RenderOptions) {
    return renderAngular(setupOptions, this.request, opts);
  });
  next();
}

// plugin
export const ngFastilyEngine = fastifyPlugin(fastifyAngularEngine, {
  fastify: '3.x',
  name: '@aiao/universal-fastify-engine'
});
