import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login.model';


import { Alert } from '../alert/alert.model';
import { TokenService } from '../common/token.service';
import { LoginService } from './login.service';
import { LoginResult } from './login-result.model';
import { HttpError } from '../common/http-error.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = new Login('', '');
  alert: Alert;

  constructor(private tokenService: TokenService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.tokenService.get();
  }

  onSubmit() {
    this.loginService.login(this.model.loginId, this.model.password)
      .subscribe(res => this.loginSuccessHandler(res), (error) => this.loginErrorHandler(error));
  }

  private loginSuccessHandler(res: LoginResult) {
    this.router.navigate(['tasks']);
  }

  private loginErrorHandler(error: HttpError) {
    this.alert = new Alert(error.message);
  }
}
