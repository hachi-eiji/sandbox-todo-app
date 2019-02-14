import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      'loginId': ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm.getRawValue());
    if (this.registerForm.valid) {
    } else {
      this.showLoginError(this.registerForm.get('loginId').errors);
    }
  }

  private showLoginError(errors: ValidationErrors) {
    if (!errors) {
      return;
    }
    if (errors.required) {
      this.message = 'ログインIDを入力してください';
    }
    if (errors.maxlength) {
      const e = errors.maxlength;
      // 実際はhtmlファイルにmaxlength書くがrequiredLengthとかを試してみたい
      this.message = `ログインIDは${e.requiredLength}文字以内で入力してください(現在の長さ${e.actualLength})`;
    }
  }
}
