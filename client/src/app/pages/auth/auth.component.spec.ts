import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import AuthComponent from './auth.component';
import { CognitoService } from '../../shared/services/cognito.service';
import { ApiService } from '../../shared/services/api.service';
import { CacheService } from '../../shared/services/cache/cache.service';
import { ActionsService } from '../../shared/services/actions.service';
import { ClarityService } from '../../shared/services/clarity.service';
import { signal } from '@angular/core';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockCognitoService: Partial<CognitoService>;

  beforeEach(async () => {
    mockCognitoService = {
      validateCognitoCode: jest.fn()
    };

    const mockCacheService = {
      isValidatingToken: { set: jest.fn() },
      dataCache: signal({}),
      isLoggedIn: { set: jest.fn() },
      greenChecks: { set: jest.fn() },
      currentResultIsLoading: { set: jest.fn() },
      currentResultId: jest.fn().mockReturnValue('123')
    };

    const mockApiService = {
      login: jest.fn(),
      refreshToken: jest.fn()
    };

    const mockActionsService = {
      showGlobalAlert: jest.fn(),
      updateLocalStorage: jest.fn()
    };

    const mockClarityService = {
      updateUserInfo: jest.fn()
    };

    const mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AuthComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              },
              queryParamMap: {
                get: () => null
              },
              queryParams: {}
            }
          }
        },
        { provide: CognitoService, useValue: mockCognitoService },
        { provide: ApiService, useValue: mockApiService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ActionsService, useValue: mockActionsService },
        { provide: ClarityService, useValue: mockClarityService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
