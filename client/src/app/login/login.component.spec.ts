import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { User } from '../shared/user/user';
import * as UserAction from '../shared/user/user.action';
import { UserService } from '../shared/user/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService;
  let router: Router;
  let store: Store<User>;

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('UserService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, CoreModule, SharedModule, StoreModule.forRoot({})],
      providers: [
        {provide: UserService, useValue: loginService},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component.message).toEqual(undefined);
  });

  it('should false form valid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should error message when a user not found', () => {
    const e = {
      status: 404,
      error: {
        message: 'not found'
      }
    };
    loginService.login.and.returnValue(throwError(e));

    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();

    fixture.whenStable().then(() => {
      expect(component.message).toEqual('not found');
    });
  });

  it('should redirect task when a user found', () => {
    loginService.login.and.returnValue(Observable.create(o => o.next({status: 200, message: 'ok'})));

    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();

    fixture.whenStable().then(() => {
      expect(component.message).toEqual(undefined);
      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      const action = new UserAction.Login({user: {id: 1, name: 'foo'}});
      store.dispatch(action);
      expect(navArgs).toEqual(['tasks']);
    });
  });

  it('should display message "input id, password', () => {
    component.login();

    fixture.whenStable().then(() => {
      expect(component.message).toEqual('ログインIDもしくはパスワードを入力してください');
    });
  });
});
