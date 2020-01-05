import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';

describe('TokenController', () => {
  let tester: TokenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
    }).compile();

    tester = app.get<TokenController>(TokenController);
  });

  describe('/token', () => {
    it('should return dummy token', () => {
      expect(tester.getToken()).toStrictEqual({ token: 'test' });
    });
  });
});
