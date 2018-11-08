import { Action } from '@ngrx/store';
import { User } from './user';

export enum AuthActionTypes {
  AUTH = '[Auth Page] auth',
  AUTH_SUCCESS = '[Auth API] auth_success',
  AUTH_FAILURE = '[Auth API] auth_failure'
}

export class AuthAction implements Action {
  readonly type = AuthActionTypes.AUTH;

  constructor() {}
}

export class AuthSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class AuthFailureAction implements Action {
  readonly type = AuthActionTypes.AUTH_FAILURE;

  constructor(public payload: { error: any }) {}
}

export type AuthActionTypesUnion = AuthAction | AuthSuccessAction | AuthFailureAction;
