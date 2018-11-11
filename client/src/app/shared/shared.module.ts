import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, AlertComponent, ConfirmModalComponent],
  exports: [ButtonComponent, AlertComponent, ConfirmModalComponent]
})
export class SharedModule {}
