import { FastifyStaticOptions } from 'fastify-static';

import { NgSetupOptions } from '@aiao/universal-fastify-engine';

export interface NestUniversalOptions extends NgSetupOptions {
  production: boolean;
  paths: string[];
  disableRender?: boolean;
  // only production false
  browserHost?: string;
  browserPort?: number;
  fastifyStaticOptions?: Omit<FastifyStaticOptions, 'root' | 'wildcard' | 'decorateReply'>;
}
