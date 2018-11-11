import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import { Modal } from './modal.model';
import { By } from '@angular/platform-browser';

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
      () => {
        return 'success';
      },
      () => {
        return 'error';
      },
      {
        title: 'test_title',
        okMessage: 'ok_message',
        cancelMessage: 'cancel'
      }
    );
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

  class DummyMethod {
    some_method () {

    }
  }

  it('should return test value when ok button is clicked', async(() => {
    const spy = spyOn(new DummyMethod(), 'some_method');
    component.modal = new Modal(
      'test_message',
      spy,
      () => {
        return 'error';
      },
    );
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mdl-button'));
    const el = de.nativeElement;
    el.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spy.calls.any()).toBe(true);
    });
  }));

  it('should return test value when cancel button is clicked', async(() => {
    const spy = spyOn(new DummyMethod(), 'some_method');
    component.modal = new Modal(
      'test_message',
      () => {
        return 'success';
      },
      spy,
    );
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.close'));
    const el = de.nativeElement;
    el.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spy.calls.any()).toBe(true);
    });
  }));
});
