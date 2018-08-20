import {User} from '../../shared/user/user';

export interface LoginResult {
  id: string;
  message: string;
  data: User;
}
