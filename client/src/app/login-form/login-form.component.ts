import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Login } from './login';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient } from '../common/HttpClient';
import { HttpResponseError } from '../common/HttpResponseError';
import { Alert } from '../alert/Alert';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = new Login('', '');
  alert: Alert;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.httpClient.getJson('/token')
      .subscribe();
  }

  onSubmit() {
    this.httpClient.postJson('/login', {loginId: this.model, password: this.model.password})
      .subscribe(res => this.loginSuccessHandler(res), (error) => this.loginErrorHandler(error));
  }

  private loginSuccessHandler(res: Response) {
    this.router.navigate(['tasks']);
  }

  private loginErrorHandler(error: HttpResponseError) {
    this.alert = new Alert(error.message);
  }
}
