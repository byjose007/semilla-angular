import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EnvironmentService } from '../environment.service';

describe('Shared -> Service EnvironmentService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EnvironmentService
      ]
    });

  });

  it('Should be defined',
    inject([EnvironmentService], (environmentService) => {
      expect(environmentService).toBeDefined();
    })
  );

  it('Should return promise',
    inject([EnvironmentService], (environmentService) => {

      const data = environmentService.loadConfig();
      expect(data instanceof Promise).toEqual(true);
    })
  );

  it('Should store config data',
    inject([EnvironmentService, HttpTestingController], (environmentService, backend) => {

      const config = { 'api1': 'http://fake.com' };

      environmentService.loadConfig().then(() => {
        expect(environmentService.data).toEqual(config);
      });
      backend.expectOne('config.json').flush(config);
    }));

});
