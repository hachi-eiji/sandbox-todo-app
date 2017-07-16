import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { AlertComponent } from '../alert/alert.component';

import { TokenService } from '../common/token.service';
import { LoginService } from './login.service';
import { Login } from './login';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        TokenService,
        LoginService
      ],
      declarations: [LoginFormComponent, AlertComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.model = new Login('', '');
    component.alert = null;
    const tokenService = fixture.debugElement.injector.get(TokenService);
    spyOn(tokenService, 'get');
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
