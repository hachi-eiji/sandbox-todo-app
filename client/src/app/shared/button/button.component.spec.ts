import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('set text in button', () => {
    component.text = 'test';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toEqual('test');
  });

  it('set button type', () => {
    component.buttonType = 'danger';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.danger')).not.toBeNull();
  });

  it('set button size', () => {
    component.buttonSize = 'small';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.small')).not.toBeNull();
  });

  it('set disable mode', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.is-disabled')).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('[disabled]')).not.toBeNull();
  });
});
