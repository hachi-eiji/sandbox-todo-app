import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { HttpService } from '../../core/http/http.service';
import { User } from '../../shared/user/user';
import * as UserAction from '../../shared/user/user.action';
import { LoginResult } from './login-result.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService, private store: Store<User>) {
  }

  login(id: string, password: string): Observable<LoginResult> {
    return this.httpService.post<LoginResult>('/login', { loginId: id, password: password })
      .pipe(tap(result => this.store.dispatch(new UserAction.Login(result.data))));
  }
}
