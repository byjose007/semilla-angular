import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services';
import { ROUTES_CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.isLoggedOut$.pipe(
      map(isLoggedOut => {
        if (isLoggedOut) {
          // logged in so return true
          return true;
        }
        this.router.navigate([ROUTES_CONSTANTS.DASBOARD.DASHBOARD.fullPath]);
        return false;
      })
    );
  }
}
