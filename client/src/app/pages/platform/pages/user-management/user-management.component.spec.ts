import { ComponentFixture, TestBed } from '@angular/core/testing';
import UserManagementComponent from './user-management.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let apiService: jest.Mocked<ApiService>;

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  beforeEach(async () => {
    const mockApiService = {
      getUsers: jest.fn().mockResolvedValue({ data: [] }),
      getOrganizationsIds: jest.fn().mockResolvedValue({ data: [] }),
      getRoles: jest.fn().mockResolvedValue({ data: [] }),
      getGCFComponentesIds: jest.fn().mockResolvedValue({ data: [] })
    };

    await TestBed.configureTestingModule({
      imports: [UserManagementComponent, TableModule, SelectModule, ButtonModule, SectionHeaderComponent],
      providers: [{ provide: ApiService, useValue: mockApiService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });

  afterAll(() => {
    // @ts-ignore
    delete global.ResizeObserver;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty arrays', () => {
    expect(component.users()).toEqual([]);
    expect(component.organizationsIds()).toEqual([]);
    expect(component.roles()).toEqual([]);
    expect(component.gcfComponentesIds()).toEqual([]);
  });

  it('should call all required services on init', async () => {
    await component.ngOnInit();
    expect(apiService.getUsers).toHaveBeenCalled();
    expect(apiService.getOrganizationsIds).toHaveBeenCalled();
    expect(apiService.getRoles).toHaveBeenCalled();
    expect(apiService.getGCFComponentesIds).toHaveBeenCalled();
  });

  it('should clear filters', () => {
    component.organizationSelected.set(1);
    component.roleSelected.set(1);
    component.gcfComponenteSelected.set(1);

    component.clearFilters();

    expect(component.organizationSelected()).toBeNull();
    expect(component.roleSelected()).toBeNull();
    expect(component.gcfComponenteSelected()).toBeNull();
    expect(apiService.getUsers).toHaveBeenCalled();
  });

  it('should update filters and get users when organization is selected', () => {
    const mockEvent = { value: { id: 1 } };
    component.setOrganizationSelected(mockEvent);
    expect(component.organizationSelected()).toBe(1);
    expect(apiService.getUsers).toHaveBeenCalled();
  });

  it('should update filters and get users when role is selected', () => {
    const mockEvent = { value: { id: 1 } };
    component.setRoleSelected(mockEvent);
    expect(component.roleSelected()).toBe(1);
    expect(apiService.getUsers).toHaveBeenCalled();
  });

  it('should update filters and get users when GCF component is selected', () => {
    const mockEvent = { value: { id: 1 } };
    component.setGCFComponenteSelected(mockEvent);
    expect(component.gcfComponenteSelected()).toBe(1);
    expect(apiService.getUsers).toHaveBeenCalled();
  });
});
