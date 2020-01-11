import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  login(@Body('loginId') loginId: string, @Body('password') password: string) {
    const isSuccess = this.loginService.login(loginId, password);
    if (isSuccess) {
      return this.successObject();
    }
    return this.failedObject();
  }

  private successObject() {
    return {
      status: 200,
      id: 'user_exists',
      message: 'ok',
      data: {
        id: 1,
        name: 'テスト太郎',
      },
    };
  }

  private failedObject() {
    return {
      status: 404,
      id: 'login_failed',
      message: 'ログインID・パスワードが間違っています',
    };
  }
}
