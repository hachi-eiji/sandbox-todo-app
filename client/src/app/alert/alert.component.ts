import { Component, Input } from '@angular/core';
import { Alert } from './Alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input()
  alert: Alert;
}
