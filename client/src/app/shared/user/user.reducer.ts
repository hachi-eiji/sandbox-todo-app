import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from './user';
import { UserActionTypes, UserActionTypesUnion } from './user.action';


export interface UserState {
  user: User;
}

const userFeature = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(userFeature, (state) => state ? state.user : null);

export function userReducer(state: UserState, action: UserActionTypesUnion): UserState {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
}
