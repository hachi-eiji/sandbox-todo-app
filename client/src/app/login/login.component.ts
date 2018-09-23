import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { User } from '../shared/user/user';
import * as UserReducer from '../shared/user/user.reducer';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.component.sp.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(
    private store: Store<User>,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group(
      {
        loginId: ['', Validators.required],
        password: ['', Validators.required]
      }
    );

    this.store.pipe(select(UserReducer.loginError)).subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {
  }

  login() {
    const form = this.loginForm;
    if (form.valid) {
      this.userService.login(form.get('loginId').value, form.get('password').value);
    } else {
      this.message = 'ログインIDもしくはパスワードを入力してください';
    }
  }
}
