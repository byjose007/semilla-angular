import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ApiCallUrl } from '../../models';
import { API_CALL_URL } from '../../constants';

describe('shared -> Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
  });

  it('Should be defined', inject([ApiService], apiService => {
    expect(apiService).toBeDefined();
  }));

  it('getApiInstance should return instance of apiCallUrl', inject(
    [ApiService],
    (apiService, utilsService) => {
      const apiExpected = <ApiCallUrl>(
        utilsService.copyDeepObject(API_CALL_URL.AUTH)
      );

      expect(apiService.getApiInstance(API_CALL_URL.AUTH)).toEqual(apiExpected);
    }
  ));

  it('getApiUrl should return correct url with mock server without params', inject(
    [ApiService],
    (apiService, utilsService) => {
      const apiInstance = utilsService.copyDeepObject(API_CALL_URL.AUTH.LOGIN);
      const contextUrl = 'http://localhost:3000';

      const url = apiService.getApiUrl(contextUrl, apiInstance);
      const urlExpected = 'http://localhost:3000/login';
      expect(url).toEqual(urlExpected);
    }
  ));

  it('getApiUrl should return correct url with mock server with params', inject(
    [ApiService],
    (apiService) => {
      const apiInstance = apiService.getApiInstance(API_CALL_URL);
      apiInstance.params.mediatorId.value = '22';
      const contextUrl = 'http://localhost:3000';

      const url = apiService.getApiUrl(contextUrl, apiInstance);

      const urlExpected = 'http://localhost:3000/dashboard/commercialActivity/22';
      expect(url).toEqual(urlExpected);
    }
  ));
});
