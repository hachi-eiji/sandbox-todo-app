import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { User } from './user';
import * as UserAction from './user.action';
import { userReducer } from './user.reducer';

import { UserService } from './user.service';

describe('UserService', () => {
  let httpServiceSpy;
  let store: Store<User>;
  let tester: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,
        StoreModule.forRoot({user: userReducer})
      ]
    });

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['get', 'post']);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    tester = new UserService(httpServiceSpy, store);
  });

  it('should store user when can get user', () => {
    tester.login('user', 'pass');
    expect(store.dispatch).toHaveBeenCalledWith(new UserAction.Login({loginId: 'user', password: 'pass'}));
  });

  it('should get user when data stored', () => {
    store.dispatch(new UserAction.LoginSuccess({user: {id: 1, name: 'test'}}));
    tester.get().subscribe(d => {
      expect(d).toEqual({id: 1, name: 'test'});
    });
  });

  it('should an error occurred when data no stored and can not get me from server', () => {
    const error = new HttpErrorResponse({
      error: {message: 'not found'},
      status: 404
    });
    httpServiceSpy.get.and.returnValue(throwError(error));
    tester.get().subscribe(d => fail(d), (e: HttpErrorResponse) => {
      expect(httpServiceSpy.get.calls.count()).toBe(1);
      expect(e.status).toBe(404);
      expect(e.error.message).toEqual('not found');
    });
  });

  it('should get user when data no stored and can get me from server', function () {
    const data = {id: 1, name: 'test'};
    httpServiceSpy.get.and.returnValue(of(data));
    tester.get().subscribe(d => {
      expect(httpServiceSpy.get.calls.count()).toBe(1);
      expect(d).toEqual(data);
    }, e => fail(e));
  });
});
