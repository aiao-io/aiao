import { FastifyRequest } from 'fastify';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { Logger } from '@nestjs/common';
import { CommonEngine, RenderOptions as NgRenderOptions } from '@nguniversal/common/engine';

import { NgSetupOptions, RenderOptions } from './interface';

const templateCacheMap = new Map<string, string>();

function getDocument(path: string): string | undefined {
  if (templateCacheMap.has(path)) {
    return templateCacheMap.get(path);
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
    templateCacheMap.set(path, file);
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
  const { bootstrap, distPath, document, documentFilePath, providers: defaultProviders } = setupOptions;
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
      },
      {
        provide: 'Logger',
        useValue: Logger
      }
    ]
  };

  if (!renderOptions.document) {
    const doc = documentFilePath || distPath;
    renderOptions.document = getDocument(doc) || '<h1>404</h1>';
    renderOptions.documentFilePath = doc;
  }
  return engine.render(renderOptions);
};
