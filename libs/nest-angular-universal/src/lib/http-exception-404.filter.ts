import { FastifyReply, FastifyRequest } from 'fastify';

import { ArgumentsHost, Catch, HttpException, Inject, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { NestUniversalOptions } from './interface';

@Catch(HttpException)
export class HttpException404Filter extends BaseExceptionFilter {
  baseHrefs!: string[];
  constructor(@Inject('NEST_ANGULAR_UNIVERSAL_OPTIONS') opts: NestUniversalOptions[]) {
    super();
    const baseHrefSet = new Set<string>();
    opts.forEach(d => baseHrefSet.add(d.baseHref || '/'));
    this.baseHrefs = Array.from(baseHrefSet);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const { accept } = req.headers;
    const userAgent = req.headers['user-agent'];
    if (status === 404 && userAgent && accept?.includes('text/html') && this.isAllowUrl(req.url)) {
      res
        .renderAngular()
        .then(html => {
          res.type('text/html').send(html);
        })
        .catch(error => {
          res.status(500).send({
            message: 'renderAngular error'
          });
          Logger.error(error, 'NestAngularUniversalModule');
        });
    } else {
      super.catch(exception, host);
    }
  }
  private isAllowUrl(url: string) {
    return this.baseHrefs.some(href => url.startsWith(href));
  }
}
