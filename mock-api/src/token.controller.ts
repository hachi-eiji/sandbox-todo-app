import { Controller, Get } from '@nestjs/common';

@Controller('/token')
export class TokenController {

  @Get()
  getToken() {
    return { token: 'test' };
  }
}
