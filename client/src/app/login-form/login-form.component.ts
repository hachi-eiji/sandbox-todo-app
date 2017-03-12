import { Component, OnInit } from "@angular/core";
import { Login } from "./login";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { HttpClient } from "../common/HttpClient";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = new Login('', '');

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.getJson('/token')
      .subscribe(data => console.log(data), error => console.log(error));
  }

  onSubmit() {
    this.httpClient.postJson('/login', this.model)
      .subscribe(res => console.log(res), error => console.log(error));
  }
}
