import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './session.controller';

describe('AppController', () => {
  let tester: SessionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
    }).compile();

    tester = app.get<SessionController>(SessionController);
  });

  describe('/me/session', () => {
    it('should return dummy session', () => {
      expect(tester.getMe()).toStrictEqual({ id: 1, name: 'テスト太郎' });
    });
  });
});
