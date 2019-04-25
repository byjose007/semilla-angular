import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymousGuard } from './anonymous.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../../services';

describe('AnonymousGuard', () => {
  const environmentServiceMock = {
    'data': {
      'apiUrl': 'http://example.com'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AnonymousGuard,
        { provide: EnvironmentService, useValue: environmentServiceMock }]
    });
  });

  it('should ...', inject([AnonymousGuard], (guard: AnonymousGuard) => {
    expect(guard).toBeTruthy();
  }));
});
