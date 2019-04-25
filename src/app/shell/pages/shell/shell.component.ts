import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoaderService, MultiLanguageService } from '../../../shared';

@Component({
  selector: 'c-profile-shell',
  templateUrl: './shell.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ShellComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private loader: LoaderService,
    private router: Router,
    private language: MultiLanguageService
  ) {}

  ngOnInit() {
    this.language.initialize();
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: Event) => {
        this.navigationInterceptor(event);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loader.showLoader();
      return;
    }
    if (event instanceof NavigationEnd) {
      this.loader.hide();
      return;
    }
    if (event instanceof NavigationCancel) {
      this.loader.hide();
      return;
    }
    if (event instanceof NavigationError) {
      this.loader.hide();
      return;
    }
  }
}
