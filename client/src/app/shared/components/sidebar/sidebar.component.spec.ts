import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import SidebarComponent from './sidebar.component';
import { ActionsService } from '../../services/actions.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CacheService } from '../../services/cache/cache.service';
import { AuthPermissionsService } from '../../services/auth-permissions.service';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockActionsService: Partial<ActionsService>;
  let mockCacheService: any;
  let mockAuthPermissionsService: Partial<AuthPermissionsService>;

  beforeEach(async () => {
    mockActionsService = {
      logOut: jest.fn()
    };

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
        }
      }),
      currentUser: signal({
        org_logo: 'logo.png'
      }),
      hasSmallScreenWidth: () => false,
      hasSmallScreen: () => false,
      isSidebarCollapsed: signal(false),
      toggleSidebar: jest.fn()
    };

    mockAuthPermissionsService = {
      setCurrentRole: jest.fn(),
      isAdmin: jest.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
      providers: [
        { provide: ActionsService, useValue: mockActionsService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: AuthPermissionsService, useValue: mockAuthPermissionsService },
        provideNoopAnimations()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
