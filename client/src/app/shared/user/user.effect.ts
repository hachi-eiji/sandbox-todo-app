import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../core/http/http.service';
import { LoginResult } from '../../login/shared/login-result.model';
import * as UserAction from './user.action';

@Injectable()
export class UserEffect {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(UserAction.UserActionTypes.LOGIN),
    map((action: UserAction.Login) => action.payload),
    exhaustMap(payload => {
      return this.httpService.post<LoginResult>('/login', payload).pipe(
        map(result => new UserAction.LoginSuccess({ user: result.data })),
        catchError(error => of(new UserAction.LoginFailure({ error: error.error })))
      );
    })
  );

  @Effect({ dispatch: false })
  $loginSuccess = this.actions$.pipe(
    ofType(UserAction.UserActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['tasks']))
  );

  constructor(private actions$: Actions, private httpService: HttpService, private router: Router) {}
}
