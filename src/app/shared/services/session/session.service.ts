import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  getToken(value: string) {
    return sessionStorage.getItem(value);
  }

  setToken(tokenName: string, value: string) {
    sessionStorage.setItem(tokenName, value);
  }

  removeToken(value: string) {
    sessionStorage.removeItem(value);
  }
}
