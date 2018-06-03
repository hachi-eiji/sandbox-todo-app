import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from './http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HttpService
  ]
})
export class CoreModule { }
