import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../core/http/http.service';
import { LoginResult } from '../../login/shared/login-result.model';
import { UserActions, login, loginSuccess, loginFailure } from './user.action';

@Injectable()
export class UserEffect {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(login.type),
    map(action => action.payload),
    exhaustMap(payload => {
      return this.httpService.post<LoginResult>('/login', payload).pipe(
        map(result => loginSuccess({ user: result.data })),
        catchError(error => of(loginFailure({ error: error.error })))
      );
    })
  );

  @Effect({ dispatch: false })
  $loginSuccess = this.actions$.pipe(
    ofType(loginSuccess.type),
    tap(() => this.router.navigate(['tasks']))
  );

  constructor(private actions$: Actions<UserActions>, private httpService: HttpService, private router: Router) {
  }
}
