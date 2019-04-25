import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AuthService,
  LoaderService,
  ROUTES_CONSTANTS,
  UtilsFunctions
} from '../../../../shared';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services';

@Component({
  selector: 'c-profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentMonth: string;
  data$: Observable<string>;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private loader: LoaderService,
    private translate: TranslateService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.initObservables();
    this.setCurrentMonth();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout() {
    this.loader.showLoader();
    this.auth
      .logout()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate([ROUTES_CONSTANTS.LOGIN.LOGIN.fullPath]);
      });
  }

  private initObservables() {
    this.data$ = this.data.exampleMethod();
  }

  private setCurrentMonth() {
    const today = new Date();
    const month = UtilsFunctions.getMonth(today);
    const monthTranslations = this.translate.instant('COMMON.DATE.MONTHS');
    this.currentMonth = UtilsFunctions.resolvePath(month, monthTranslations);
  }
}
