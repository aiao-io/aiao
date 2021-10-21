import { NgModuleFactory, StaticProvider, Type } from '@angular/core';

export interface NgSetupOptions {
  bootstrap: Type<any> | NgModuleFactory<any>;
  distPath: string;
  baseHref?: string;
  document?: string;
  documentFilePath?: string;
  providers?: StaticProvider[];
  /**
   * Reduce render blocking requests by inlining critical CSS.
   * Defaults to true.
   */
  inlineCriticalCss?: boolean;
}

export interface RenderOptions {
  baseHref?: string;
  document?: string;
  documentFilePath?: string;
  providers?: StaticProvider[];
  inlineCriticalCss?: boolean;
}

declare module 'fastify' {
  interface FastifyReply {
    renderAngular: (opts?: RenderOptions) => Promise<string>;
  }
}
