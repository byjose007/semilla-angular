import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActionButton } from '../../models';
import { Buttons } from '../../constants';

@Component({
  selector: 'c-profile-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  title: string;

  @Input()
  buttons: ActionButton[];

  @Output()
  close = new EventEmitter<any>();

  @Output()
  action = new EventEmitter<Buttons>();

  get showClose() {
    return this.close.observers.length > 0;
  }

  closeModal() {
    this.close.emit();
  }

  handleAction(actionId) {
    this.action.emit(actionId);
  }
}
