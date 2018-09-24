import { Login } from './user.action';
import * as userReducer from './user.reducer';

describe('UserReducer', () => {
  describe('LOGIN', () => {
    it('should return login state', function () {
      const state: userReducer.UserState = {user: {id: 1, name: 'test'}, error: null};
      const loginAction = new Login({loginId: 'foo', password: 'test'});
      expect(userReducer.userReducer(state, loginAction)).toEqual({user: null, error: null});
    });
  });
});
