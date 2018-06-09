import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {throwError} from 'rxjs/internal/observable/throwError';
import {CoreModule} from '../core/core.module';

import {LoginComponent} from './login.component';
import {LoginService} from './shared/login.service';
import {SharedModule} from '../shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService;

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, CoreModule, SharedModule],
      providers: [
        {provide: LoginService, useValue: loginService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
    fixture.debugElement.nativeElement.querySelector('button').click();

    fixture.whenStable().then(() => {
      expect(component.message).toEqual('not found');
    });
  });

  it('should redirect task when a user found', () => {
    loginService.login.and.returnValue({status: 200, message: 'ok'});

    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    fixture.debugElement.nativeElement.querySelector('button').click();

    fixture.whenStable().then(() => {
      expect(component.message).toEqual(undefined);
    });
  });
});
