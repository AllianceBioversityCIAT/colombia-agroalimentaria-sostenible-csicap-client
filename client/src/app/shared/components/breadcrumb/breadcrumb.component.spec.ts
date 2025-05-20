import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { PageTitleService } from '../../services/page-title.service';
import { CacheService } from '../../services/cache/cache.service';
import { AuthPermissionsService } from '../../services/auth-permissions.service';
import { signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: BreadcrumbComponent,
    data: {
      breadcrumb: [{ path: 'platform', label: 'Platform' }]
    }
  }
];

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let router: Router;

  // Mock de PageTitleService
  const pageTitleServiceMock = {
    breadcrumb$: {
      pipe: () => ({
        subscribe: (fn: any) => fn([{ label: 'Test', routerLink: '/test' }])
      })
    },
    home: { icon: 'pi pi-home', routerLink: '/' } as MenuItem
  };

  // Mock de CacheService
  const cacheServiceMock = {
    dataCache: () => ({
      user: { rolesPersonas: [{ rol_id: 1 }] }
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: PageTitleService, useValue: pageTitleServiceMock },
        { provide: CacheService, useValue: cacheServiceMock },
        {
          provide: AuthPermissionsService,
          useValue: {
            isAdmin: signal(true)
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with home item', () => {
    expect(component.home).toBeDefined();
    expect(component.home.icon).toBe('pi pi-home');
    expect(component.home.routerLink).toBe('/');
  });

  it('should handle route changes', async () => {
    await router.navigate(['/']);
    fixture.detectChanges();
    expect(component.items).toBeDefined();
  });
});
