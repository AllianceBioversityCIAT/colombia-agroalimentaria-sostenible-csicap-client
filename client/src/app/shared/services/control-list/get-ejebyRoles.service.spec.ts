import { TestBed } from '@angular/core/testing';

import { GetEjeByRoleService } from './get-ejebyRoles.service';

describe('GetEjeByRoleService', () => {
  let service: GetEjeByRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEjeByRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
