import { NgSetupOptions } from '@aiao/universal-fastify-engine';
import { StaticProvider } from '@angular/core';

export interface NestUniversalOptions extends NgSetupOptions {
  disableRender?: boolean;
  production?: boolean;
  providers?: StaticProvider[];
  // use locale
  browserHost?: string;
  browserPort?: number;
}
