import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { User } from './user';
import { userReducer } from './user.reducer';

import { UserService } from './user.service';

describe('UserService', () => {
  let httpClientSpy: { post: jasmine.Spy; };
  let store: Store<User>;
  let tester: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule,
        StoreModule.forRoot({user: userReducer})
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    tester = new UserService(<any>httpClientSpy, store);
  });

  it('should store user when can get user', () => {
    const data = {id: 100, name: 'test'};
    httpClientSpy.post.and.returnValue(of({id: 1, message: 'ok', data: data}));
    tester.login('user', 'pass').subscribe(d => {
      expect(d.data).toEqual(data);
      store.select('user').subscribe(u => expect(u).toEqual(data));
    }, e => fail(e));
  });

  it('should not store when an error occurred', () => {
    const error = new HttpErrorResponse({
      error: {message: 'not found'},
      status: 404
    });
    httpClientSpy.post.and.returnValue(throwError(error));
    tester.login('not found user', 'pass').subscribe(d => fail(d), (e: HttpErrorResponse) => {
      expect(e.status).toBe(404);
      expect(e.error.message).toEqual('not found');
      store.select('user').subscribe(u => expect(u).toBeNull());
    });
  });
});
