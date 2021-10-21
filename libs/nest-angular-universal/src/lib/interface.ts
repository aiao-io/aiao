import { FastifyStaticOptions } from 'fastify-static';

import type { NgSetupOptions } from '@aiao/universal-fastify-engine';

export interface NestUniversalOptions extends NgSetupOptions {
  production: boolean;
  fastifyStaticOptions?: Omit<FastifyStaticOptions, 'root' | 'wildcard' | 'decorateReply'>;
  // only production false
  browserHost?: string;
  browserPort?: number;
}
