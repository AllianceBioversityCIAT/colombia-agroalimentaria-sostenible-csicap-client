import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import PlatformComponent from './platform.component';
import { CacheService } from '../../shared/services/cache/cache.service';
import { ActionsService } from '../../shared/services/actions.service';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthPermissionsService } from '../../shared/services/auth-permissions.service';

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    data: {
      breadcrumb: [{ path: 'platform', label: 'Platform' }]
    }
  }
];

describe('PlatformComponent', () => {
  let component: PlatformComponent;
  let fixture: ComponentFixture<PlatformComponent>;
  let mockActionsService: Partial<ActionsService>;
  let mockCacheService: any;
  let mockAuthPermissionsService: Partial<AuthPermissionsService>;

  beforeEach(async () => {
    mockCacheService = {
      dataCache: signal({
        user: {
          nombre: 'Test',
          apellido: 'User',
          rolesPersonas: [
            {
              rol_id: 1,
              rol: {
                nombre: 'Admin'
              }
            }
          ]
        },
        menu: {
          items: []
        }
      }),
      currentUser: signal({
        org_logo: 'logo.png'
      }),
      isLoggedIn: signal(true),
      hasSmallScreenWidth: () => false,
      hasSmallScreen: () => false,
      isSidebarCollapsed: signal(false),
      toggleSidebar: jest.fn()
    };

    mockActionsService = {
      isTokenExpired: jest.fn()
    };

    mockAuthPermissionsService = {
      setCurrentRole: jest.fn(),
      isAdmin: jest.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [PlatformComponent, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: CacheService, useValue: mockCacheService },
        { provide: ActionsService, useValue: mockActionsService },
        { provide: AuthPermissionsService, useValue: mockAuthPermissionsService },
        provideNoopAnimations()
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
