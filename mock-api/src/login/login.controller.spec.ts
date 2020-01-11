import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('Login Controller', () => {
  let controller: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    controller = module.get<LoginController>(LoginController);
  });

  describe('when loginId, password is correct', () => {
    it('should be success object', () => {
      jest.spyOn(loginService, 'login').mockImplementation(() => true);
      expect(controller.login('test', 'test')).toEqual({
          status: 200,
          id: 'user_exists',
          message: 'ok',
          data: {
            id: 1,
            name: 'テスト太郎',
          },
        },
      );
    });
  });

  describe('when loginId, password is incorrect', () => {
    it('should be error object', () => {
      jest.spyOn(loginService, 'login').mockImplementation(() => false);
      expect(controller.login('test', 'test')).toEqual({
        status: 404,
        id: 'login_failed',
        message: 'ログインID・パスワードが間違っています',
      });
    });
  });
});
