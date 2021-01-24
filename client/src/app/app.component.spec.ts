import { CommonModule } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { LoadingComponent } from './core/loading/loading.component';
import { userReducer } from './shared/user/user.reducer';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoadingComponent,
        HeaderComponent,
        AppComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule, StoreModule.forRoot({ user: userReducer })
      ],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
