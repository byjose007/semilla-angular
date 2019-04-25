import { InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export const useValue =  (route: ActivatedRouteSnapshot) => {
  const externalUrl = route.paramMap.get('externalUrl');
  window.open(externalUrl, '_self');
};

export const EXTERNAL_PROVIDER = {
  provide: externalUrlProvider,
  useValue
};
