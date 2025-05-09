import { TestBed } from '@angular/core/testing';

import { AuthPermissionsService } from './auth-permissions.service';

describe('AuthPermissionsService', () => {
  let service: AuthPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
