import {Injectable} from '@angular/core';

import {HttpService} from '../../core/http/http.service';
import {LoginResult} from './login-result.model';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService) {
  }

  login(id: string, password: string): Observable<LoginResult> {
    return this.httpService.post<LoginResult>('/login', {loginId: id, password: password});
  }
}
