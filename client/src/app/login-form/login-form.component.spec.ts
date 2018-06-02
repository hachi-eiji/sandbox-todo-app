import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable, throwError} from 'rxjs';
import {FormsModule} from '@angular/forms';

import {LoginFormComponent} from './login-form.component';
import {AlertComponent} from '../alert/alert.component';

import {TokenService} from '../common/token.service';
import {LoginService} from './login.service';
import {Login} from './login.model';
import {TokenStorageService} from '../common/token-storage.service';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientService} from '../common/http-client.service';

describe('LoginFormComponent', () => {
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let tokenService: TokenService;
  let loginService: LoginService;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      providers: [
        TokenService,
        LoginService,
        HttpClientService,
        TokenStorageService,
        {provide: Router, useValue: mockRouter}
      ],
      declarations: [LoginFormComponent, AlertComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.alert = null;
    loginService = fixture.debugElement.injector.get(LoginService);
    tokenService = fixture.debugElement.injector.get(TokenService);
    spyOn(tokenService, 'get').and.callFake(() => {
    });
    fixture.detectChanges();
  });

  it('show initial display', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[name=loginId]')).nativeElement.value).toEqual('');
    expect(fixture.debugElement.query(By.css('[name=password]')).nativeElement.value).toEqual('');
  });

  it('should show login failed message', async(() => {
    spyOn(loginService, 'login').and.returnValue(throwError({message: 'ログイン失敗'}));
    component.model = new Login('user', 'pass');
    expect(component.model.loginId).toEqual('user');
    expect(component.model.password).toEqual('pass');
    fixture.debugElement.query(By.css('[type=submit]')).nativeElement.click();

    fixture.whenStable().then(() => {
      expect(component.alert.message).toEqual('ログイン失敗');
      expect(component.alert.type).toEqual('error');
    });
  }));

  it('should navigate to task page', async(() => {
    spyOn(loginService, 'login').and.returnValue(Observable.create(observer => observer.next()));
    component.model = new Login('user', 'pass');
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.whenStable().then(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['tasks']);
    });
  }));
});
