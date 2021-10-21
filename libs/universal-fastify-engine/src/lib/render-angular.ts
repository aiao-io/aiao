import { FastifyRequest } from 'fastify';

import { Logger } from '@nestjs/common';
import { CommonEngine, RenderOptions as NgRenderOptions } from '@nguniversal/common/engine';

import { getDocument } from './get-document';
import { NgSetupOptions, RenderOptions } from './interface';

export const renderAngular = (
  engine: CommonEngine,
  setupOptions: NgSetupOptions,
  request: FastifyRequest,
  opts?: RenderOptions
) => {
  const { url, headers } = request;

  const { bootstrap, distPath, document, documentFilePath, providers: defaultProviders } = setupOptions;

  const proto = headers['x-forwarded-proto'] || 'http';
  const serverUrl = `${proto}://${request.hostname}`;

  // providers
  let providers = defaultProviders || [];
  if (opts?.providers) {
    providers = [...providers, ...opts.providers];
  }

  const renderOptions: NgRenderOptions = {
    url,
    bootstrap,
    document,
    inlineCriticalCss: false,
    ...opts,
    providers: [
      ...providers,
      {
        provide: 'serverUrl',
        useValue: serverUrl
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
