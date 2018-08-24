import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { HttpService } from '../../core/http/http.service';
import { LoginResult } from '../../login/shared/login-result.model';
import { User } from './user';
import * as UserAction from './user.action';
import * as UserReducer from './user.reducer'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService, private store: Store<User>) {
  }

  login(id: string, password: string): Observable<LoginResult> {
    return this.httpService.post<LoginResult>('/login', { loginId: id, password: password })
      .pipe(tap(result => this.store.dispatch(new UserAction.Login(result.data))));
  }

  get(): Observable<User> {
    return this.store.pipe(select(UserReducer.selectUser));
  }
}
