import { Action } from '@ngrx/store';
import { User } from './user';

export enum UserActionTypes {
  LOGIN = 'login',
}

export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;

  constructor(public payload: User) {
  }
}

export type UserActionTypesUnion = Login ;
