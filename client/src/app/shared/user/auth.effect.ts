import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { scheduled, asapScheduler } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { HttpService } from '../../core/http/http.service';
import { AuthActionTypes, auth, authSuccess, authFailure } from './auth.action';
import { User } from './user';

@Injectable()
export class AuthEffect {
  @Effect()
  auth$ = this.actions$.pipe(
    ofType(auth.type),
    exhaustMap(() => {
      return this.httpService.get<User>('/me/session').pipe(
        map(user => authSuccess({ user })),
        catchError(error => scheduled([authFailure({ error: error.error })], asapScheduler))
      );
    })
  );

  @Effect({ dispatch: false })
  authFailure$ = this.actions$.pipe(
    ofType(authFailure.type),
    tap(() => {
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    })
  );

  constructor(private actions$: Actions<AuthActionTypes>, private httpService: HttpService, private router: Router) {
  }
}
