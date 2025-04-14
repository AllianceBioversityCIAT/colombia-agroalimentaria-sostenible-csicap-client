import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, RouterTestingModule.withRoutes(routes)]
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
