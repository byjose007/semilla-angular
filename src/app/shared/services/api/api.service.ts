import { Injectable } from '@angular/core';

import { ApiCallUrl } from '../../models';
import { UtilsFunctions } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getApiUrl(apiContextUrl: string, apiCallUrl: ApiCallUrl) {
    const params = apiCallUrl.params;

    for (const param in apiCallUrl.params) {
      if (apiCallUrl.params.hasOwnProperty(param)) {
        const keyFormatted = this._getKeyFormatted(
          apiCallUrl.params[param].key
        );
        apiCallUrl.path = apiCallUrl.path.replace(
          keyFormatted,
          apiCallUrl.params[param].value
        );
      }
    }

    const url = apiContextUrl + apiCallUrl.path;

    return url;
  }

  getApiInstance(value: ApiCallUrl) {
    return <ApiCallUrl>UtilsFunctions.copyDeep(value);
  }

  private _getKeyFormatted(key: string) {
    return '{' + key + '}';
  }
}
