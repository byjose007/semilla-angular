import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../../services';

describe('AuthGuard', () => {
  const environmentServiceMock = {
    'data': {
      'apiUrl': 'http://example.com'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: EnvironmentService, useValue: environmentServiceMock }]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
