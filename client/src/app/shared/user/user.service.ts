import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { mergeMap } from 'rxjs/operators';

import { HttpService } from '../../core/http/http.service';
import { User } from './user';
import * as UserAction from './user.action';
import * as UserReducer from './user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService, private store: Store<User>) {
  }

  login(loginId: string, password: string) {
    this.store.dispatch(new UserAction.Login({loginId, password}));
  }

  get(): Observable<User> {
    return this.store.pipe(
      select(UserReducer.selectUser),
      mergeMap((u: User) => {
        return u ? of(u) : this.httpService.get<User>('/users/me');
      })
    );
  }
}
