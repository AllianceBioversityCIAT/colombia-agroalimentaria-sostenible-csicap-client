import { TestBed } from '@angular/core/testing';

import { GetOrganizationsIdsService } from './get-organizationsIds.service';

describe('GetOrganizationsIdsService', () => {
  let service: GetOrganizationsIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrganizationsIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
