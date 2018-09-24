import { Login, LoginSuccess } from './user.action';
import * as userReducer from './user.reducer';

describe('UserReducer', () => {
  describe('LOGIN', () => {
    it('should return login state', () => {
      const state: userReducer.UserState = {user: {id: 1, name: 'test'}, error: null};
      const loginAction = new Login({loginId: 'foo', password: 'test'});
      expect(userReducer.userReducer(state, loginAction)).toEqual({user: null, error: null});
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should return login success user state', () => {
      const state: userReducer.UserState = {user: {id: 1, name: 'test'}, error: null};
      const user = {id: 100, name: 'login success user'};
      const loginAction = new LoginSuccess({user});
      expect(userReducer.userReducer(state, loginAction)).toEqual({user, error: null});
    });
  });
});
