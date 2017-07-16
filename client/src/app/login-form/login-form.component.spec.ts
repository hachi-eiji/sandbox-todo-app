import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { AlertComponent } from '../alert/alert.component';

import { TokenService } from '../common/token.service';
import { LoginService } from './login.service';
import { Login } from './login';
import { ConnectionBackend, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { HttpClient } from '../common/HttpClient';
import { TokenStorage } from '../common/TokenStorage';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { HttpResponseError } from '../common/HttpResponseError';

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
      imports: [FormsModule, HttpModule],
      providers: [
        TokenService,
        LoginService,
        HttpClient,
        Http,
        ConnectionBackend,
        TokenStorage,
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
    const val = Observable.throw(new HttpResponseError({message: 'ログイン失敗'}, new Response(new ResponseOptions()), 404));
    spyOn(loginService, 'login').and.returnValue(val);
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
      expect(mockRouter.navigate).toHaveBeenCalledWith(['task']);
    });
  }));
});
