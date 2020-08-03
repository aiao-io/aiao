import { NgModuleFactory, StaticProvider, Type } from '@angular/core';

export interface NgSetupOptions {
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  distPath: string;
  defaultLocale?: string;
  document?: string;
  documentFilePath?: string;
  locales?: string[];
  providers?: StaticProvider[];
}

export interface RenderOptions {
  locale?: string;
  document?: string;
  providers?: StaticProvider[];
  disableSend?: boolean;
}

declare module 'fastify' {
  interface FastifyReply {
    renderAngular: (opts?: RenderOptions) => Promise<string>;
  }
}
