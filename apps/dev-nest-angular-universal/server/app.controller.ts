import { Controller, Get } from '@nestjs/common';

let index = 0;
@Controller()
export class AppController {
  @Get('hello')
  hello() {
    return { name: `hello ${index++}` };
  }
}
