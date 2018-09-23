import { Action } from '@ngrx/store';
import { User } from './user';

export enum UserActionTypes {
  LOGIN = 'login',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
}

export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;

  constructor(public payload: { loginId: string, password: string }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class LoginFailure implements Action {
  readonly type = UserActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: any }) {
  }
}

export type UserActionTypesUnion = Login
  | LoginSuccess
  | LoginFailure
  ;
