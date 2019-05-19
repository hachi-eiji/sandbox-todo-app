import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../shared/user/auth.service';
import { User } from '../shared/user/user';
import * as UserReducer from '../shared/user/user.reducer';
import { LoginResult } from './shared/login-result.model';

@Injectable({ providedIn: 'root' })
export class LoginFacade {
  private loginError = this.store.pipe(select(UserReducer.loginError));

  constructor(private store: Store<User>,
              private authService: AuthService) {
  }

  get loginError$(): Observable<string> {
    return this.loginError;
  }

  login(loginId: string, password: string): Observable<{}> {
    return this.authService.login(loginId, password).pipe(
      switchMap((result: LoginResult) => new Observable(o => o.next(result.data))),
      catchError(err => {
        throw err.error;
      })
    );
  }
}
