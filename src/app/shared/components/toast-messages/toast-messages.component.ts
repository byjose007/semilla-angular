import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../../services';
import { takeUntil } from 'rxjs/operators';
import { ToastOptions } from '../../models';

@Component({
  selector: 'c-profile-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit, OnDestroy {
  toasts: ToastOptions[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.toasts.push(res);
        if (res.close) {
          setTimeout(() => {
            const toastIndex = this.toasts.findIndex(toast => toast.id === res.id);
            this.toasts.splice(toastIndex, 1);
          }, res.duration);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trackByFn(index, item) {
    return item.id;
  }
}
