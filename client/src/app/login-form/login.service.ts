import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClientService } from '../common/http-client.service';
import { LoginResult } from './login-result';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClientService) {
  }

  login(loginId: String, password: String): Observable<LoginResult> {
    return this.httpClient.post('/login', {loginId: loginId, password: password});
  }
}
