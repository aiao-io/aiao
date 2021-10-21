import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/hello')
  hello() {
    return { name: 'aiao' };
  }
}
