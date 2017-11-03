import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TokenStorage } from './common/TokenStorage';
import { AlertComponent } from './alert/alert.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { LoginService } from './login-form/login.service';
import { TokenService } from './common/token.service';
import { TaskService } from './task/task.service';
import { HttpClientService } from './common/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'tasks', component: TaskListComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AlertComponent,
    NotFoundComponent,
    TaskListComponent,
    LoadingComponent,
    ConfirmModalComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TokenService,
    TokenStorage,
    LoginService,
    TaskService,
    HttpClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
