import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { Alert } from './alert.model';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should message and error css', () => {
    component.alert = new Alert('error message');
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('div'));
    const el = de.nativeElement;
    expect(el.className).toContain('alert alert__error');
    expect(el.textContent).toEqual('error message');
  });

  it('should message and success css', () => {
    component.alert = new Alert('success message', 'success');
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('div'));
    const el = de.nativeElement;
    expect(el.className).toContain('alert alert__success');
    expect(el.textContent).toEqual('success message');
  });
});
