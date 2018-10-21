import { Action } from '@ngrx/store';
import { User } from './user';

export enum UserActionTypes {
  LOGIN = '[Login Page] login',
  LOGIN_SUCCESS = '[Login API] success',
  LOGIN_FAILURE = '[Login API] failure',
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
