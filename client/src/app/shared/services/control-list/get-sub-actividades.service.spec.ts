import { TestBed } from '@angular/core/testing';

import { GetSubActividadesService } from './get-sub-actividades.service';

describe('GetSubActividadesService', () => {
  let service: GetSubActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSubActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
