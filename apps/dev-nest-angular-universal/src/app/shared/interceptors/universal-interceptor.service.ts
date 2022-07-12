import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import type { Logger } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
@Injectable()
export class UniversalInterceptorService implements HttpInterceptor {
  constructor(
    @Optional() @Inject('UNIVERSAL_SERVER_URL_TOKEN') protected serverUrl: string,
    @Optional() @Inject('UNIVERSAL_SERVER_LOGGER_TOKEN') protected logger: Logger,
    @Optional() @Inject('UNIVERSAL_SERVER_REQUEST_TOKEN') protected request: FastifyRequest
  ) {
    console.log('req.headers', request.headers);
    console.log('serverUrl', serverUrl);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.logger.log(`${this.serverUrl}${req.url}`, 'UniversalInterceptorService');
    const serverReq = this.serverUrl
      ? req.clone({
          url: `${this.serverUrl}${req.url}`
        })
      : req;
    return next.handle(serverReq);
  }
}
