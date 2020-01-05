import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  login(loginId: string, password: string): boolean {
    return loginId === 'test' && password === 'test';
  }
}
