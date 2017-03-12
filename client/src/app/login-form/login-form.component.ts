import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Login } from './login';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient } from '../common/HttpClient';
import { HttpResponseError } from '../common/HttpResponseError';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = new Login('', '');
  showError = false;
  message = '';
  type = '';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.getJson('/token')
      .subscribe();
  }

  onSubmit() {
    this.httpClient.postJson('/login', this.model)
      .subscribe(res => this.loginSuccessHandler(res), (error) => this.loginErrorHandler(error));
  }

  private loginSuccessHandler(res: Response) {
    this.showError = false;
  }

  private loginErrorHandler(error: HttpResponseError) {
    this.showError = true;
    this.message = error.message;
    this.type = 'error';
  }
}
