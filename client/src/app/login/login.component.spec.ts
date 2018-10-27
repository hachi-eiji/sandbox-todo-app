import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import * as UserAction from '../shared/user//user.action';
import { User } from '../shared/user/user';
import { UserEffect } from '../shared/user/user.effect';
import { userReducer } from '../shared/user/user.reducer';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let store: Store<User>;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule, CoreModule, SharedModule,
        StoreModule.forRoot({user: userReducer}),
        EffectsModule.forRoot([UserEffect]),
      ],
      providers: [
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
    expect(component.message).toEqual(null);
  });

  it('should false form valid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login method', () => {
    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();
    const action = new UserAction.Login({loginId: 'user', password: 'password'});
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display message "input id, password', () => {
    component.login();
    fixture.whenStable().then(() => {
      expect(component.message).toEqual('ログインIDもしくはパスワードを入力してください');
    });
  });
});
