import {User} from './user';
import {UserActionTypes, UserActionTypesUnion} from './user.action';

export function userReducer(state: User, action: UserActionTypesUnion) {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return action.payload;
    default:
      return null;
  }
}
