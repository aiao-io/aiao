import { FastifyReply } from 'fastify';

import { Controller, Get, Res } from '@nestjs/common';

let index = 0;
@Controller()
export class AppController {
  @Get()
  root(@Res() res: FastifyReply) {
    res.redirect(302, '/home');
  }

  @Get('api/hello')
  hello() {
    return { name: `hello ${index++}` };
  }
}
