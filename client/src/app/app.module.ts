import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AlertComponent} from './alert/alert.component';
import {AppComponent} from './app.component';
import {HttpClientService} from './common/http-client.service';
import {TokenStorageService} from './common/token-storage.service';
import {TokenService} from './common/token.service';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {CoreModule} from './core/core.module';
import {LoginModule} from './login/login.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskComponent} from './task/task.component';
import {TaskService} from './task/task.service';

const appRoutes: Routes = [
  {path: 'tasks', component: TaskListComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NotFoundComponent,
    TaskListComponent,
    ConfirmModalComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    LoginModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TokenService,
    TokenStorageService,
    TaskService,
    HttpClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
