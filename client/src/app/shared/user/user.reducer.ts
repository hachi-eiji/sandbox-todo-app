import { User } from './user';
import { UserActionTypes, UserActionTypesUnion } from './user.action';


export interface UserState {
  user: User;
}

export const selectUser = (state: UserState) => state.user;

export function userReducer(state: User, action: UserActionTypesUnion): User {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return action.payload;
    default:
      return null;
  }
}
