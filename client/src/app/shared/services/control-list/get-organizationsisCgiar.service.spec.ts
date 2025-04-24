import { TestBed } from '@angular/core/testing';

import { GetOrganizationsIsCgiarService } from './get-organizationsisCgiar.service';

describe('GetOrganizationsIsCgiarService', () => {
  let service: GetOrganizationsIsCgiarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrganizationsIsCgiarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
