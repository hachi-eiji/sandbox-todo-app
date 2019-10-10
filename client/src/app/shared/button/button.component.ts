import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  text: string;
  @Input()
  buttonType: 'submit' | 'danger';
  @Input()
  buttonSize: 'small';
  @Output()
  clickEvent = new EventEmitter<any>();
  @Input()
  disabled = false;

  constructor() {}

  handleClick() {
    this.clickEvent.emit();
  }
}
