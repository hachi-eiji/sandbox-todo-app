import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from '../core/dialog/dialog.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  declarations: [ButtonComponent, AlertComponent, ConfirmModalComponent, DialogComponent],
  exports: [ButtonComponent, AlertComponent, ConfirmModalComponent, DialogComponent]
})
export class SharedModule {}
