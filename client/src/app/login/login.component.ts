import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as UserAction from '../shared/user//user.action';
import { User } from '../shared/user/user';
import * as UserReducer from '../shared/user/user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.component.sp.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(private store: Store<User>, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.pipe(select(UserReducer.loginError)).subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {}

  login() {
    const form = this.loginForm;
    if (form.valid) {
      this.store.dispatch(
        new UserAction.Login({ loginId: form.get('loginId').value, password: form.get('password').value })
      );
    } else {
      this.message = 'ログインIDもしくはパスワードを入力してください';
    }
  }
}
