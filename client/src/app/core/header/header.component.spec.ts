import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import * as AuthActionTypes from '../../shared/user/auth.action';
import { User } from '../../shared/user/user';
import { userReducer } from '../../shared/user/user.reducer';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<User>;
  let router: Router;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, StoreModule.forRoot({user: userReducer})
      ],
      declarations: [HeaderComponent],
      providers: [
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get user name', () => {
    store.dispatch(AuthActionTypes.authSuccess({ user: { id: 1, name: 'mike' } }));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('header')).nativeElement.textContent).toEqual('mike');
  });
});
