import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenService } from './../../token/token.service';

import { RestInterceptor } from './../rest.interceptor';

describe(`AuthHttpInterceptor`, () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RestInterceptor,
          multi: true,
        },
        TokenService
      ],
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should not add an Authorization header', () => {
    const fakeUrl = 'http://fakeUrl.com';

    http.get(fakeUrl).subscribe(response => {
      expect(fakeUrl).toBeTruthy();
      expect(httpRequest.request.headers.has('Authorization')).toBe(false);

    });

    const httpRequest = httpMock.expectOne(`${fakeUrl}`);

  });


  it('should  add an Authorization header', () => {
    const fakeUrl = 'http://fakeUrl.com';
    spyOn(TokenService.prototype, 'getToken').and.returnValue('hola');

    http.get(fakeUrl).subscribe(response => {
      expect(fakeUrl).toBeTruthy();
      expect(httpRequest.request.headers.has('Authorization')).toBe(true);

    });

    const httpRequest = httpMock.expectOne(`${fakeUrl}`);

  });

});
