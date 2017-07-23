import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './login.service';
import { TokenStorage } from '../common/TokenStorage';
import { HttpClientService } from '../common/http-client.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService, HttpClientService, TokenStorage]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
