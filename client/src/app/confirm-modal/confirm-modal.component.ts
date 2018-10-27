import { Component, Input } from '@angular/core';
import { Modal } from './modal.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.pug',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input()
  modal: Modal;

  onOkButton() {
    this.modal.okCallback();
  }

  onCancelButton() {
    this.modal.cancelCallback();
  }
}
