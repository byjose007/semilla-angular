import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTES_CONSTANTS } from '../../constants';
import { AuthService } from '../../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          // logged in so return true
          return true;
        }
        this.router.navigate([ROUTES_CONSTANTS.LOGIN.LOGIN.fullPath], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
  }
}
