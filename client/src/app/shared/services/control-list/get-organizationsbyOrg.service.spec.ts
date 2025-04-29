import { TestBed } from '@angular/core/testing';

import { GetRolesByOrganizationService } from './get-organizationsbyOrg.service';

describe('GetRolesByOrganizationService', () => {
  let service: GetRolesByOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRolesByOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
