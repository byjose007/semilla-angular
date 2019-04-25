import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private auth: AuthService) {}

  resolve() {
    return this.auth.user$.pipe(take(1));
  }
}
