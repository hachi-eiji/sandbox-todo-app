import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../shared/user/auth.service';
import { User } from '../shared/user/user';
import { loginSuccess, loginFailure } from '../shared/user/user.action';
import * as UserReducer from '../shared/user/user.reducer';

@Injectable({ providedIn: 'root' })
export class LoginFacade {
  private loginError = this.store.pipe(select(UserReducer.loginError));

  constructor(private store: Store<User>,
              private authService: AuthService) {
  }

  get loginError$(): Observable<string> {
    return this.loginError;
  }

  login(loginId: string, password: string) {
    this.authService.login(loginId, password).pipe(
      map(result => loginSuccess({ user: result.data })),
      catchError(err => new Observable((observable) => observable.next(loginFailure({ error: err.error }))))
    );
  }
}
