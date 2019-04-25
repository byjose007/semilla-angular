import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { TokenService } from './../token/token.service';
import { EnvironmentService } from '../environment';
import { TokenData } from '../../models';
import { SessionService } from '../session';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenService,
    private envConf: EnvironmentService,
    private session: SessionService
  ) {}

  intercept(
    req: HttpRequest<{}>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.manageRequest(req);

    return next
      .handle(authReq)
      .pipe(
        tap((event: HttpEvent<{}>) => {
          if (event instanceof HttpResponse) {
            this.manageTokens(event);
          }
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errMsg = this.manageErrors(error);
          return throwError(errMsg);
        })
      );
  }

  private manageErrors(error: HttpErrorResponse) {
    let errMsg = '';
    // Client Side Error
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    } else {
      // Server Side Error
      errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    return errMsg;
  }

  private manageTokens(event: HttpResponse<any>) {
    const res = <TokenData>event.body;
    const token: TokenData = { accessToken: res.accessToken };
    this.token.setToken(token);
  }

  private manageRequest(req: HttpRequest<{}>) {
    let authReq;
    if (this.token.getToken()) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.token.getToken()}` }
      });
    } else {
      authReq = req.clone();
    }
    return authReq;
  }
}
