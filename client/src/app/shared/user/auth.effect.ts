import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { select } from '@ngrx/store';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { HttpService } from '../../core/http/http.service';
import { AuthActionTypes, AuthSuccessAction, AuthFailureAction } from './auth.action';
import { User } from './user';

import * as UserReducer from './user.reducer';

@Injectable()
export class AuthEffect {
  @Effect()
  auth$ = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH),
    select(UserReducer.selectUser),
    exhaustMap(payload => {
      if (payload) {
        return of(payload);
      }
      return this.httpService.get<User>('/users/me').pipe(
        map((user) => new AuthSuccessAction({user})),
        catchError((error) => of(new AuthFailureAction({error: error.error})))
      );
    })
  );

  @Effect({dispatch: false})
  authFailure$ = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_FAILURE),
    tap(() => {
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    })
  );

  constructor(private actions$: Actions, private httpService: HttpService, private router: Router) {
  }
}
