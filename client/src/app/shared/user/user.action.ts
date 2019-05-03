import { union, createAction } from '@ngrx/store';
import { User } from './user';

export const login = createAction(
  '[Login Page] login',
  (payload: { loginId: string; password: string }) => ({ payload })
);

export const loginSuccess = createAction(
  '[Login API] success',
  (payload: { user: User }) => ({ payload })
);

export const loginFailure = createAction(
  '[Login API] failure',
  (payload: { error: any }) => ({ payload })
);

const actions = union({
  login,
  loginSuccess,
  loginFailure
});
export type UserActions = typeof actions;
