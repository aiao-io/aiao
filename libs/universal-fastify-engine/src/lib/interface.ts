import { NgModuleFactory, StaticProvider, Type } from '@angular/core';

export interface NgSetupOptions {
  bootstrap: Type<any> | NgModuleFactory<any>;
  outputPath: string;
  baseHref?: string;
  document?: string;
  documentFilePath?: string;
  providers?: StaticProvider[];
  inlineCriticalCss?: boolean;
}

export interface RenderOptions {
  document?: string;
  providers?: StaticProvider[];
  inlineCriticalCss?: boolean;
}

declare module 'fastify' {
  interface FastifyReply {
    renderAngular: (opts?: RenderOptions) => Promise<string>;
  }
}
export const SERVER_URL_TOKEN = 'UNIVERSAL_SERVER_URL_TOKEN';
export const SERVER_LOGGER_TOKEN = 'UNIVERSAL_SERVER_LOGGER_TOKEN';
export const SERVER_REQUEST_TOKEN = 'UNIVERSAL_SERVER_REQUEST_TOKEN';
