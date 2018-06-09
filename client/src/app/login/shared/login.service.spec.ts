import {inject, TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {CoreModule} from '../../core/core.module';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [CoreModule]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
