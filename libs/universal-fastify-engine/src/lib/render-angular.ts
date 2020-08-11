import { FastifyRequest } from 'fastify';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { ɵCommonEngine as CommonEngine, ɵRenderOptions as NgRenderOptions } from '@nguniversal/common/engine';

import { NgSetupOptions, RenderOptions } from './interface';

const templateCache = new Map<string, string>();

function getDocument(path: string): string | undefined {
  if (templateCache.has(path)) {
    return templateCache.get(path)!;
  }
  const indexOriginal = join(path, 'index.original.html');
  const index = join(path, 'index.html');

  let file!: string;
  if (existsSync(indexOriginal)) {
    file = readFileSync(indexOriginal).toString();
  } else if (existsSync(index)) {
    file = readFileSync(index).toString();
  }
  if (file) {
    templateCache.set(path, file);
    return file;
  }
  return undefined;
}

export const renderAngular = (
  engine: CommonEngine,
  setupOptions: NgSetupOptions,
  request: FastifyRequest,
  opts?: RenderOptions
) => {
  const { url, headers } = request;
  const {
    bootstrap,
    defaultLocale,
    distPath,
    document,
    documentFilePath,
    locales,
    providers: defaultProviders
  } = setupOptions;
  const proto = headers['x-forwarded-proto'];

  // providers
  let providers = defaultProviders || [];
  if (opts?.providers) {
    providers = [...providers, ...opts.providers];
  }

  const renderOptions: NgRenderOptions = {
    url,
    bootstrap,
    documentFilePath,
    document,
    ...opts,
    providers: [
      ...providers,
      {
        provide: 'serverUrl',
        useValue: `${proto}://${request.hostname}`
      }
    ]
  };

  if (!renderOptions.document) {
    let indexLocalePath!: string;
    if (locales && locales.length > 0) {
      const locale = opts?.locale || locales.find(loc => url.startsWith(`/${loc}`)) || defaultLocale;
      if (locale) {
        indexLocalePath = join(distPath, locale);
      }
    }
    const doc = indexLocalePath || documentFilePath || distPath;
    renderOptions.document = getDocument(doc) || '<h1>404</h1>';
  }
  return engine.render(renderOptions);
};
