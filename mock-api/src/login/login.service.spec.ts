import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be truthy', () => {
    expect(service.login('test', 'test')).toBeTruthy();
  });

  it('should be falsy', () => {
    expect(service.login('test', 'not password')).toBeFalsy();
  });
});
