import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, tap, flatMap } from 'rxjs/operators';
import { ApiService } from '../api';
import { EnvironmentService } from '../environment';
import { API_CALL_URL, ANONYMOUS_USER } from '../../constants';
import { TokenService } from '../token';
import { User, TokenData } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  private subject = new BehaviorSubject<User>(undefined);

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private envConf: EnvironmentService,
    private token: TokenService,
  ) {
    // Init variables
    this.user$ = this.subject.asObservable().pipe(filter(user => !!user));
    this.isLoggedIn$ = this.user$.pipe(
      map(user => !!user.id)
    );
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
    this.getUser().subscribe(
      user => {
        this.subject.next(user ? user : ANONYMOUS_USER);
      },
      () => this.subject.next(ANONYMOUS_USER)
    );
  }

  getUser() {
    const apiInstance = this.api.getApiInstance(API_CALL_URL.AUTH.USER);
    const url = this.api.getApiUrl(
      this.envConf.data.currentApiUrl,
      apiInstance
    );
    return this.http.get<User>(url);
  }

  login(user: string, password: string) {
    const apiInstance = this.api.getApiInstance(API_CALL_URL.AUTH.LOGIN);
    const url = this.api.getApiUrl(
      this.envConf.data.currentApiUrl,
      apiInstance
    );
    return this.http
      .post<TokenData>(url, { user, password })
      .pipe(
        flatMap(() => {
          return this.getUser();
        })
      )
      .pipe(shareReplay())
      .pipe(tap(loggedUser => this.subject.next(loggedUser)));
  }

  logout() {
    this.subject.next(ANONYMOUS_USER);
    return of({}).pipe(
      tap(() => {
        this.token.removeToken();
      })
    );
  }
}
