import { TestBed } from '@angular/core/testing';

import { GetActividadesService } from './get-actividades.service';

describe('GetActividadesService', () => {
  let service: GetActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
