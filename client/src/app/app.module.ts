import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HttpRequestInterceptor } from './core/http/http-request-interceptor';
import { LoadingComponent } from './core/loading/loading.component';
import { LoginModule } from './login/login.module';
import { metaReducers } from './ngrx-debug';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthEffect } from './shared/user/auth.effect';
import { userReducer } from './shared/user/user.reducer';

const appRoutes: Routes = [
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

const httpInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoadingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    StoreModule.forRoot({ user: userReducer }, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([AuthEffect]),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    httpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
