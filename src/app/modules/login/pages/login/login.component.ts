import { Component, OnDestroy } from '@angular/core';
import { LoginUser } from '../../models';
import { LoaderService, AuthService, ROUTES_CONSTANTS } from '../../../../shared';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'c-profile-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  backendLoginErrors = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private loader: LoaderService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login({ username, password }: LoginUser) {

    this.router.navigate([ROUTES_CONSTANTS.DASBOARD.DASHBOARD.fullPath]);

    // this.loader.showLoader();
    // this.auth
    //   .login(username, password)
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(
    //     () => {
    //       this.router.navigate([ROUTES_CONSTANTS.DASBOARD.DASHBOARD.fullPath]);
    //     },
    //     err => {
    //       console.error(err);
    //       this.backendLoginErrors = true;
    //       this.loader.hide();
    //     }
    //   );
  }
}
