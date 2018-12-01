import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from './modal.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input()
  modal: Modal;
  @Output()
  okButton = new EventEmitter();
  @Output()
  cancelButton = new EventEmitter();

  onOkButton() {
    this.okButton.emit();
  }

  onCancelButton() {
    this.cancelButton.emit();
  }
}
