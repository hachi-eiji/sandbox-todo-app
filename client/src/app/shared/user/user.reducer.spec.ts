import { AuthSuccessAction } from './auth.action';
import { Login, LoginSuccess, LoginFailure } from './user.action';
import * as userReducer from './user.reducer';
import { UserState } from './user.reducer';

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

  describe('LOGIN_FAILURE', () => {
    let actual: UserState;
    beforeEach(() => {
      const state = {user: {id: 1, name: 'test'}, error: null};
      const loginAction = new LoginFailure({error: 'some error'});
      actual = userReducer.userReducer(state, loginAction);
    });

    it('should user is null', () => {
      expect(actual.user).toBeNull();
    });

    it('should error is not null', () => {
      expect(actual.error).toEqual('some error');
    });
  });

  describe('AUTH_SUCCESS', () => {
    let actual: UserState;
    const user = {id: 100, name: 'auth success user'};
    beforeEach(() => {
      const state = {user, error: null};
      const loginAction = new AuthSuccessAction({user});
      actual = userReducer.userReducer(state, loginAction);
    });

    it('should user is not null', () => {
      expect(actual.user).toEqual(user);
    });

    it('should error is null', () => {
      expect(actual.error).toBeNull();
    });
  });
});
