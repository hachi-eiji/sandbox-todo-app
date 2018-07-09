import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/internal/Observable';
import {LoginService} from './shared/login.service';
import {Store} from '@ngrx/store';
import {User} from '../shared/user/user';
import * as UserAction from '../shared/user/user.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.component.sp.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;

  constructor(
    private store: Store<User>,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
          (result) => {
            this.store.dispatch(new UserAction.Login(result.data));
            this.router.navigate(['tasks']);
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
