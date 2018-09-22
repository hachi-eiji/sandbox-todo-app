import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService;

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['get']);
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{provide: UserService, useValue: userService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get user name', () => {
    const user: User = {id: 1, name: 'mike'};
    const spy = userService.get.and.returnValue(of(user));
    fixture.detectChanges();
    expect(spy.calls.count()).toEqual(1);
    expect(fixture.debugElement.query(By.css('header')).nativeElement.textContent).toEqual('mike');
  });
});
