import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertTypes, Buttons } from '../../constants';
import { ActionButton } from '../../models';

@Component({
  selector: 'c-profile-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  _icon: string;

  @Input()
  alertType: AlertTypes;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  buttons: ActionButton[] = [];

  @Output()
  close = new EventEmitter<void>();

  @Output()
  action = new EventEmitter<Buttons>();

  get showClose() {
    return this.close.observers.length > 0;
  }

  get areButtons() {
    return this.buttons && this.buttons.length > 0;
  }

  get icon() {
    let icon = 'ok-lite';
    if (this.alertType === AlertTypes.ERROR) {
      icon = 'error-solid';
    } else if (this.alertType === AlertTypes.WARNING) {
      icon = 'alert';
    }
    this.icon = icon;
    return icon;
  }

  set icon(alertType) {
    this._icon = alertType;
  }

  closeAlert() {
    this.close.emit();
  }

  handleAction(actionId) {
    this.action.emit(actionId);
  }

}
