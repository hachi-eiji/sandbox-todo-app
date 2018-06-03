import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoginService} from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'login.sp.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login(ngForm: NgForm) {
    this.message = '';
    this.loginService.login(ngForm.value.loginId, ngForm.value.password)
      .subscribe(d => {
        console.log(d);
      }, error => {
        if (error.status === 404) {
          this.message = error.error.message;
        }
      });
  }
}
