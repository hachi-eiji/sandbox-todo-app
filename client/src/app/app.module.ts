import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { metaReducers } from './ngrx-debug';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthEffect } from './shared/user/auth.effect';
import { UserEffect } from './shared/user/user.effect';
import { userReducer } from './shared/user/user.reducer';

const appRoutes: Routes = [
  { path: 'tasks', loadChildren: './tasks/tasks.module#TasksModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    LoginModule,
    StoreModule.forRoot({ user: userReducer }, { metaReducers }),
    EffectsModule.forRoot([UserEffect, AuthEffect]),
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
