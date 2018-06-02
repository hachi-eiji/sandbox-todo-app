import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClientService } from '../common/http-client.service';
import { LoginResult } from './login-result.model';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClientService) {
  }

  login(loginId: String, password: String): Observable<LoginResult> {
    return this.httpClient.post('/login', {loginId: loginId, password: password});
  }
}
