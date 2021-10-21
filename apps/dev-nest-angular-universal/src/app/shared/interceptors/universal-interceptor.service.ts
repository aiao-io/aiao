import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import type { Logger } from '@nestjs/common';

@Injectable()
export class UniversalInterceptorService implements HttpInterceptor {
  constructor(
    @Optional() @Inject('serverUrl') protected serverUrl: string,
    @Optional() @Inject('Logger') protected logger: Logger
  ) {
    logger.log(serverUrl, 'UniversalInterceptorService');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.logger.log(req.url, 'UniversalInterceptorService');
    const serverReq = !this.serverUrl
      ? req
      : req.clone({
          url: `${this.serverUrl}${req.url}`
        });
    return next.handle(serverReq);
  }
}
