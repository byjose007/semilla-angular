import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertOptions, ToastOptions } from '../../models';
import { UtilsFunctions } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast$: Observable<ToastOptions>;

  private toastSubject = new Subject<ToastOptions>();

  constructor() {
    this.toast$ = this.toastSubject.asObservable();
  }

  show(alert: AlertOptions, close = true, duration = 3000) {
    const options = {
      id: UtilsFunctions.getRandomId('toast_'),
      duration,
      close,
      ...alert
    };

    this.toastSubject.next(options);
  }
}
