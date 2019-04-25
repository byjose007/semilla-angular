import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Environment } from '../../models';

/**
 * Environment Service takes constants defined in /config/app.config.json and
 * creates a service with values and make them accesible throught a angular 2 service
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public data: Environment;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    const promise = this.http.get('config.json').toPromise();
    promise.then(config => (this.data = config as Environment, this.data.currentApiUrl = this.data.apiUrl));
    return promise;
  }
}
