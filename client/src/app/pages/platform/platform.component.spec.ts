import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import PlatformComponent from './platform.component';
import { CacheService } from '../../shared/services/cache/cache.service';
import { ActionsService } from '../../shared/services/actions.service';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlatformComponent', () => {
  let component: PlatformComponent;
  let fixture: ComponentFixture<PlatformComponent>;
  let mockActionsService: Partial<ActionsService>;

  beforeEach(async () => {
    const mockCacheService = {
      dataCache: signal({
        user: {
          nombre: 'Test',
          apellido: 'User'
        }
      }),
      isLoggedIn: { set: jest.fn() }
    };

    mockActionsService = {
      isTokenExpired: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PlatformComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CacheService, useValue: mockCacheService },
        { provide: ActionsService, useValue: mockActionsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
