import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.component.sp.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.loginForm = this.fb.group(
      {
        loginId: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  login() {
    const form = this.loginForm;
    if (form.valid) {
      this.loginService.login(form.get('loginId').value, form.get('password').value)
        .subscribe(
          d => {
            // console.log(d);
          },
          error => {
            if (error.status === 404) {
              this.message = error.error.message;
            }
          });
    } else {
      this.message = 'ログインIDもしくはパスワードを入力してください';
    }
  }
}
