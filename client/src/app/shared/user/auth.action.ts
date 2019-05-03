import { union, createAction } from '@ngrx/store';
import { User } from './user';

export const auth = createAction('[Auth Page] auth');

export const authSuccess = createAction(
  '[Auth API] auth_success',
  (payload: { user: User }) => ({ payload })
);

export const authFailure = createAction(
  '[Auth API] auth_failure',
  (payload: { error: any }) => ({ payload })
);

const actions = union({
  auth,
  authSuccess,
  authFailure
});
export type AuthActionTypes = typeof actions;
