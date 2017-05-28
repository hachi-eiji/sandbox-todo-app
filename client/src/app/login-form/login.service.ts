import { Injectable } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginId: String, password: String): Observable<any> {
    return this.httpClient.postJson('/login', {loginId: loginId, password: password});
  }
}
