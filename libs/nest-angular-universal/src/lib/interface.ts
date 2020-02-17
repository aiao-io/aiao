import { NgSetupOptions } from '@aiao/universal-fastify-engine';

export interface NestUniversalOptions extends NgSetupOptions {
  production: boolean;
  disableRender?: boolean;
  // only production false
  browserHost?: string;
  browserPort?: number;
}
