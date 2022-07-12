import { FastifyStaticOptions } from '@fastify/static';

import type { NgSetupOptions } from '@aiao/universal-fastify-engine';

export interface NestUniversalOptions extends NgSetupOptions {
  fastifyStaticOptions?: Omit<FastifyStaticOptions, 'root' | 'wildcard' | 'decorateReply'>;
}
