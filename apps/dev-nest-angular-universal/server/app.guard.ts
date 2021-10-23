import { FastifyReply, FastifyRequest } from 'fastify';
import isMobileFn from 'ismobilejs';
import { Observable } from 'rxjs';
import { UAParser } from 'ua-parser-js';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

const ua = new UAParser();

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('canActivate');
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();
    const { accept } = req.headers;
    const userAgent = req.headers['user-agent'];
    if (userAgent && accept?.includes('text/html')) {
      const isMobile = isMobileFn(userAgent);
      ua.setUA(userAgent);
      console.log('isMobile', isMobile);
      console.log('ua', ua.getBrowser());
      console.log('ua', ua.getOS());
      console.log('ua', ua.getEngine());
      console.log('ua', ua.getDevice());
      console.log('ua', ua.getCPU());
      const supportedLocals = ['zh-Hans', 'en'];
      let locale: string;
      const cookieLocale = req.cookies.locale;
      if (cookieLocale && supportedLocals.includes(cookieLocale)) {
        locale = cookieLocale;
      } else {
        locale = req.languages(supportedLocals) || 'en';
      }
      if (!locale) {
        locale = 'en';
      }
    }
    // console.log('AppInterceptor', req.url);
    // if (!req.url.includes('1')) {
    //   res.code(302).redirect('/home?1');
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }
}
