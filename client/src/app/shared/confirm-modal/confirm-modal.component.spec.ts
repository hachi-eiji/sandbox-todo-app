import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConfirmModalComponent } from './confirm-modal.component';
import { Modal } from './modal.model';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
  });

  it('should create when set all value', () => {
    component.modal = new Modal(
      'test_message',
      {
        title: 'test_title',
        okMessage: 'ok_message',
        cancelMessage: 'cancel'
      }
    );
    component.okButton = jasmine.createSpyObj('EventEmitter', ['emit']);
    component.cancelButton = jasmine.createSpyObj('EventEmitter', ['emit']);

    fixture.detectChanges();
    expect(component).toBeTruthy();
    let de = fixture.debugElement.query(By.css('h4'));
    let el = de.nativeElement;
    expect(el.textContent).toEqual('test_title');

    de = fixture.debugElement.query(By.css('.mdl-dialog__content > p'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('test_message');

    de = fixture.debugElement.query(By.css('.mdl-button'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('ok_message');

    de = fixture.debugElement.query(By.css('.close'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('cancel');
  });

  it('should return test value when ok button is clicked', async(() => {
    const okSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    const cancelSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    component.modal = new Modal('test_message');
    component.okButton = okSpy;
    component.cancelButton = cancelSpy;

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mdl-button'));
    const el = de.nativeElement;
    el.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(okSpy.emit.calls.count()).toBe(1);
      expect(cancelSpy.emit.calls.count()).toBe(0);
    });
  }));

  it('should return test value when cancel button is clicked', async(() => {
    const okSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    const cancelSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    component.modal = new Modal('test_message');
    component.okButton = okSpy;
    component.cancelButton = cancelSpy;

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.close'));
    const el = de.nativeElement;
    el.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(okSpy.emit.calls.count()).toBe(0);
      expect(cancelSpy.emit.calls.count()).toBe(1);
    });
  }));
});
