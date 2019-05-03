import * as AuthActions from './auth.action';
import * as UserActions from './user.action';
import * as userReducer from './user.reducer';
import { UserState } from './user.reducer';

describe('UserReducer', () => {
  describe('LOGIN', () => {
    it('should return login state', () => {
      const state: userReducer.UserState = {user: {id: 1, name: 'test'}, error: null};
      const loginAction = UserActions.login({ loginId: 'foo', password: 'test' });
      expect(userReducer.userReducer(state, loginAction)).toEqual({user: null, error: null});
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should return login success user state', () => {
      const state: userReducer.UserState = {user: {id: 1, name: 'test'}, error: null};
      const user = {id: 100, name: 'login success user'};
      const loginAction = UserActions.loginSuccess({ user });
      expect(userReducer.userReducer(state, loginAction)).toEqual({user, error: null});
    });
  });

  describe('LOGIN_FAILURE', () => {
    let actual: UserState;
    beforeEach(() => {
      const state = {user: {id: 1, name: 'test'}, error: null};
      const loginAction = UserActions.loginFailure({ error: 'some error' });
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
      const loginAction = AuthActions.authSuccess({ user });
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
