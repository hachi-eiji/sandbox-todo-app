import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthActionTypesUnion, AuthActionTypes } from './auth.action';
import { User } from './user';
import { UserActionTypes, UserActionTypesUnion } from './user.action';


export interface UserState {
  user: User | null;
  error: any | null;
}

const userFeature = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(userFeature, (state) => state ? state.user : null);
export const loginError = createSelector(userFeature, (state) => state && state.error ? state.error.message : null);

export function userReducer(state: UserState, action: UserActionTypesUnion | AuthActionTypesUnion): UserState {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {user: null, error: null};
    case AuthActionTypes.AUTH_SUCCESS:
      return {...state, user: action.payload.user};
    case UserActionTypes.LOGIN_SUCCESS:
      return {...state, user: action.payload.user};
    case UserActionTypes.LOGIN_FAILURE:
      return {user: null, error: action.payload.error};
    default:
      return state;
  }
}
