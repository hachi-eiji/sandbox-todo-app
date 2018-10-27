import { Component, Input } from '@angular/core';
import { Alert } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.pug',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input()
  alert: Alert;
}
