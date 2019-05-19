import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginFacade } from './login.facade';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  const loginFacadeSpyObj = jasmine.createSpyObj<LoginFacade>('LoginFacade', ['login']);

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule, CoreModule, SharedModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: LoginFacade, useValue: loginFacadeSpyObj }
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
    expect(component.message$).toEqual(undefined);
  });

  it('should false form valid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login method', () => {
    loginFacadeSpyObj.login.and.returnValue(new Observable((o) => o.next({ id: 1, name: 'user' })));
    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();
    expect(loginFacadeSpyObj.login).toHaveBeenCalledWith('user', 'password');
  });

  it('should display message "input id, password', () => {
    component.login();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element: HTMLElement = fixture.debugElement.nativeElement;
      expect(element.querySelector('.message').textContent).toEqual('ログインIDもしくはパスワードを入力してください');
    });
  });
});
