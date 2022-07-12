import { FastifyReply } from 'fastify';

import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { AppGuard } from './app.guard';

let index = 0;
@Controller()
@UseGuards(AppGuard)
export class AppController {
  @Get()
  async root(@Res() res: FastifyReply) {
    const a = await res.renderAngular();
    res.type('text/html').send(a);
  }

  @Get('home')
  async home(@Res() res: FastifyReply) {
    const a = await res.renderAngular();
    res.type('text/html').send(a);
  }

  @Get('hello')
  async hello(@Res() res: FastifyReply) {
    const a = await res.renderAngular();
    res.type('text/html').send(a);
  }

  @Get('api/hello')
  helloApi() {
    return { name: `hello ${index++}` };
  }
}
