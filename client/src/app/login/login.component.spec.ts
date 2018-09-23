import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { User } from '../shared/user/user';
import { UserEffect } from '../shared/user/user.effect';
import { userReducer } from '../shared/user/user.reducer';
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
      imports: [
        ReactiveFormsModule, CoreModule, SharedModule,
        StoreModule.forRoot({user: userReducer}),
        EffectsModule.forRoot([UserEffect]),
      ],
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
    expect(component.message).toEqual(null);
  });

  it('should false form valid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login method', () => {
    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();
    expect(loginService.login).toHaveBeenCalledWith('user', 'password');
  });

  it('should display message "input id, password', () => {
    component.login();
    fixture.whenStable().then(() => {
      expect(component.message).toEqual('ログインIDもしくはパスワードを入力してください');
    });
  });
});
