import { Overlay } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild(CdkPortal) portal: CdkPortal;

  constructor(private overlay: Overlay) {}

  open() {
    const overlay = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true
    });
    overlay.backdropClick().subscribe(() => {
      this.close();
    });
    this.portal.attach(overlay);
  }

  close() {
    if (this.portal.isAttached) {
      this.portal.detach();
    }
  }
}
