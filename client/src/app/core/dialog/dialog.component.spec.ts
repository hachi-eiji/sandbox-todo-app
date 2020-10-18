import { OnInit, ViewChild, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: SimpleUsageComponent;
  let fixture: ComponentFixture<SimpleUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SimpleUsageComponent]
    }).compileComponents();
  }));

  describe('simple usage', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleUsageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be opened', () => {
      expect(component).toBeTruthy();
      expect(fixture.componentInstance.dialog.portal.isAttached).toBeTruthy();
    });

    it('should be closed', () => {
      fixture.componentInstance.dialog.close();
      expect(fixture.componentInstance.dialog.portal.isAttached).toBeFalsy();
    });
  });
});

@Component({
  template: `
    <app-dialog></app-dialog>
  `
})
class SimpleUsageComponent implements OnInit {
  @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent;

  ngOnInit() {
    this.dialog.open();
  }
}
