import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  InputComponent,
  InputRefDirective,
  AlertComponent,
  ToastMessagesComponent,
  ModalComponent
} from './components';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [InputComponent, InputRefDirective, AlertComponent, ToastMessagesComponent, ModalComponent],
  exports: [TranslateModule, InputComponent, AlertComponent, ToastMessagesComponent, ModalComponent]
})
export class SharedModule {}
