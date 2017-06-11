import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpResponseError } from '../common/HttpResponseError';
import { Alert } from '../alert/Alert';
import { TokenService } from '../common/token.service';
import { LoginService } from './login.service';
import { HttpResponse } from '../common/HttpResponse';

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

  private loginSuccessHandler(res: HttpResponse) {
    this.router.navigate(['tasks']);
  }

  private loginErrorHandler(error: HttpResponseError) {
    this.alert = new Alert(error.message);
  }
}
