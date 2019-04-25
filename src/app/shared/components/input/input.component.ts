import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { InputRefDirective } from './input-ref.directive';

@Component({
  selector: 'c-profile-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  icon: string;

  @Input()
  button: string;

  @Input()
  label: string;

  @Input()
  id: string;

  @Input()
  hiddenLabel = true;

  @Output()
  action = new EventEmitter<any>();

  @ContentChild(InputRefDirective)
  input: InputRefDirective;

  @Input()
  warnings: TemplateRef<any>;

  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }

  get isIcon() {
    return this.icon ? true : false;
  }

  get isButton() {
    return this.button ? true : false;
  }

  actionHandler() {
    this.action.emit();
  }
}
