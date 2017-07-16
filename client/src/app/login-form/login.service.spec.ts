import { inject, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpModule } from '@angular/http';
import { HttpClient } from '../common/HttpClient';
import { TokenStorage } from '../common/TokenStorage';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService, HttpClient, TokenStorage]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
