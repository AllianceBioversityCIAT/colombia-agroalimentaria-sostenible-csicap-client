import { TestBed } from '@angular/core/testing';

import { CognitoService } from './cognito.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PageTitleService } from './page-title.service';

describe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' })
          }
        }
      ]
    });
    service = TestBed.inject(PageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
