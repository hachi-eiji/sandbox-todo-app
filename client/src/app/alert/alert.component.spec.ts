import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { Alert } from './Alert';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
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
    expect(el.className).toContain('alert__error');
    expect(el.textContent).toEqual('error message');
  });

  it('should message and success css', () => {
    component.alert = new Alert('success message', 'success');
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('div'));
    const el = de.nativeElement;
    expect(el.className).toContain('alert__success');
    expect(el.textContent).toEqual('success message');
  });
});
