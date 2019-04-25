import { Injectable } from '@angular/core';
import { SessionService } from '../session';
import { TokenData } from '../../models';
/**
 * Environment Service takes constants defined in /config/app.config.json and
 * creates a service with values and make them accesible throught a angular 2 service
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  authToken: string;
  refreshToken: string;

  private authTokenName = 'AUTHTOKEN';
  private refreshTokenName = 'REFRESHTOKEN';
  constructor(private session: SessionService) {}

  getToken() {
    if (!this.authToken) {
      const authToken: TokenData = {accessToken: this.getTokenFromStorage(this.authTokenName)};
      this.setToken(authToken);
    }

    return this.authToken;
  }

  setToken(token: TokenData) {
    this.authToken = token && token.accessToken;
    this.refreshToken = token && token.refreshToken;
    if (this.authToken) {
      this.session.setToken(this.authTokenName, this.authToken);
    }
    if (this.refreshToken) {
      this.session.setToken(this.refreshTokenName, this.refreshToken);
    }
  }

  removeToken() {
    this.session.removeToken(this.authTokenName);
  }

  private getTokenFromStorage(tokenName: string) {
    return this.session.getToken(tokenName);
  }
}
