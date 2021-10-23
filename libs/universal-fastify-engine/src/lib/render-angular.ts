import { FastifyRequest } from 'fastify';

import { Logger } from '@nestjs/common';
import { CommonEngine, RenderOptions as NgRenderOptions } from '@nguniversal/common/engine';

import { getDocument } from './get-document';
import { NgSetupOptions, RenderOptions } from './interface';

const findOpts = (url: string, options: NgSetupOptions[]) => {
  const back = options[0];
  if (options.length > 0) {
    const find = options.find(opt => url.startsWith(opt.baseHref || '/'));
    return find || back;
  }
  return back;
};

const engineMap = new Map<any, any>();

export const renderAngular = (
  setupOptions: NgSetupOptions | NgSetupOptions[],
  request: FastifyRequest,
  opts?: RenderOptions
) => {
  const { url, headers } = request;
  let needOpts: NgSetupOptions;
  if (Array.isArray(setupOptions)) {
    needOpts = findOpts(url, setupOptions);
  } else {
    needOpts = setupOptions;
  }

  const { bootstrap, outputPath, document, documentFilePath, providers: defaultProviders } = needOpts;
  let engine: CommonEngine = engineMap.get(bootstrap);
  if (!engine) {
    engine = new CommonEngine(bootstrap);
    engineMap.set(bootstrap, engine);
  }

  const serveProto = headers['x-forwarded-proto'] || 'http';
  const serverUrl = `${serveProto}://${request.hostname}`;

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
    const doc = documentFilePath || outputPath;
    renderOptions.document = getDocument(doc) || '<h1>404</h1>';
    renderOptions.documentFilePath = doc;
  }

  return engine.render(renderOptions);
};
