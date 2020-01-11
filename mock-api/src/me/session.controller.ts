import { Controller, Get } from '@nestjs/common';

@Controller('/me/session')
export class SessionController {

  @Get()
  getMe() {
    return {
      id: 1, name: 'テスト太郎',
    };
  }
}
