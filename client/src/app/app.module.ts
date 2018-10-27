import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { TokenStorageService } from './common/token-storage.service';
import { TokenService } from './common/token.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthEffect } from './shared/user/auth.effect';
import { UserEffect } from './shared/user/user.effect';
import { userReducer } from './shared/user/user.reducer';

const appRoutes: Routes = [
  { path: 'tasks', loadChildren: 'app/tasks/tasks.module#TasksModule' },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NotFoundComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    LoginModule,
    StoreModule.forRoot({user: userReducer}, {metaReducers}),
    EffectsModule.forRoot([UserEffect, AuthEffect]),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TokenService,
    TokenStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
