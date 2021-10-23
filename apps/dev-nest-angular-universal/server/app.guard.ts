import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    console.log(req.url);
    return true;
  }
}
