import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // @Get('*')
  // async index(@Req() req: FastifyRequest, @Res() res: FastifyReply<Response>) {
  //   const html = await res.renderAngular({ disableSend: true });
  //   res.type('text/html').send(html);
  // }

  @Get('hello')
  hello() {
    return { name: 'aiao' };
  }
}
