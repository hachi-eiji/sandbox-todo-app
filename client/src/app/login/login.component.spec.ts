import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginFacade } from './login.facade';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
  const loginFacadeSpyObj = jasmine.createSpyObj<LoginFacade>('LoginFacade', ['login']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule, SharedModule
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

  it('should navigate login page', () => {
    loginFacadeSpyObj.login.and.returnValue(new Observable((o) => o.next({ id: 1, name: 'user' })));
    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();
    const routerSpy = router.navigate as jasmine.Spy;
    const navArgs = routerSpy.calls.first().args[0];
    expect(navArgs).toEqual(['tasks']);
  });

  it('should show error message when login failed', () => {
    loginFacadeSpyObj.login.and.callFake(() => {
      return throwError({ message: 'user not found' });
    });
    component.loginForm.get('loginId').setValue('user');
    component.loginForm.get('password').setValue('password');
    component.login();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element: HTMLElement = fixture.debugElement.nativeElement;
      expect(element.querySelector('.message').textContent).toEqual('user not found');
    });
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
