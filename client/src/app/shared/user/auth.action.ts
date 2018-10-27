import { Action } from '@ngrx/store';
import { User } from './user';

export enum AuthActionTypes {
  AUTH = 'auth',
  AUTH_SUCCESS = 'auth_success',
  AUTH_FAILURE = 'auth_failure'
}

export class AuthAction implements Action {
  readonly type = AuthActionTypes.AUTH;

  constructor() {
  }
}

export class AuthSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class AuthFailureAction implements Action {
  readonly type = AuthActionTypes.AUTH_FAILURE;

  constructor(public payload: { error: any }) {
  }
}

export type AuthActionTypesUnion = AuthAction
  | AuthSuccessAction
  | AuthFailureAction
  ;
