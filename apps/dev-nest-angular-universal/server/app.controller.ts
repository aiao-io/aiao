import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/hello')
  hello() {
    return { name: 'aiao' };
  }

  // @Get('*')
  // async index(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
  //   // const html = await res.renderAngular({ disableSend: true });
  //   // res.type('text/html').send(html);
  //   res.type('text/html').send(`<h1>111</h1>`);
  // }
}
