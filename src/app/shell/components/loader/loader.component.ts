import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../../shared';

@Component({
  selector: 'c-profile-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  showLoader = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderState$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(state => {
        this.showLoader = state;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
