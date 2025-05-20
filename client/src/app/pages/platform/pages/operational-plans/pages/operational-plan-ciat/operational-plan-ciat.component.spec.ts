import { ComponentFixture, TestBed } from '@angular/core/testing';
import OperationalPlanCiatComponent from './operational-plan-ciat.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../../../../../../shared/services/cache/cache.service';
import { OperationalPlanService } from './services/operational-plan.service';
import { FiltersService } from './services/filters.service';
import { UtilityService } from './services/utility.service';
import { signal } from '@angular/core';

jest.mock('../../../../../../shared/services/api.service');

describe('OperationalPlanCiatComponent', () => {
  let component: OperationalPlanCiatComponent;
  let fixture: ComponentFixture<OperationalPlanCiatComponent>;
  let planService: jest.Mocked<OperationalPlanService>;
  let filterService: jest.Mocked<FiltersService>;

  beforeEach(async () => {
    const mockApiService = {
      getPlanOperativoCiat: jest.fn().mockResolvedValue({
        data: [
          {
            id_obj: 1,
            actividades: []
          }
        ]
      }),
      downloadPlanOperativoCiatExcel: jest.fn()
    };

    const mockCacheService = {
      isSidebarCollapsed: jest.fn().mockReturnValue(false)
    };

    const mockPlanService = {
      objectives: signal([]),
      currentActivities: signal([]),
      currentObjectives: signal([]),
      activeObjectiveIndex: signal(0),
      isCiat: signal(true),
      loadingDownload: signal(false),
      getOperationalPlanData: jest.fn().mockResolvedValue(undefined),
      setPlanType: jest.fn(),
      setActiveObjectiveIndex: jest.fn(),
      updateCurrentActivities: jest.fn(),
      getPlanOperativoCiat: jest.fn(),
      getDynamicOperationalPlan: jest.fn(),
      downloadExcel: jest.fn()
    };

    const mockFilterService = {
      hasFilters: jest.fn().mockReturnValue(false),
      onActivityChange: jest.fn(),
      onSubactivityChange: jest.fn(),
      onEjeChange: jest.fn(),
      onProductoChange: jest.fn(),
      clearAllFilters: jest.fn()
    };

    const mockUtilityService = {};

    await TestBed.configureTestingModule({
      imports: [OperationalPlanCiatComponent, TableModule, TabsModule, SectionHeaderComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: OperationalPlanService, useValue: mockPlanService },
        { provide: FiltersService, useValue: mockFilterService },
        { provide: UtilityService, useValue: mockUtilityService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('ciat')
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalPlanCiatComponent);
    component = fixture.componentInstance;
    planService = TestBed.inject(OperationalPlanService) as jest.Mocked<OperationalPlanService>;
    filterService = TestBed.inject(FiltersService) as jest.Mocked<FiltersService>;
  });

  afterAll(() => {
    // @ts-ignore
    delete global.ResizeObserver;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOperationalPlanData on init', () => {
    component.ngOnInit();
    expect(planService.getOperationalPlanData).toHaveBeenCalledWith('ciat');
  });

  it('should set planId from route params', () => {
    component.ngOnInit();
    expect(component.planId()).toBe('ciat');
  });

  it('should call setActiveObjectiveIndex when setCurrentActivities is called', () => {
    component.setCurrentActivities(1);
    expect(planService.setActiveObjectiveIndex).toHaveBeenCalledWith(1);
  });

  it('should call downloadExcel when downloadExcel is called', () => {
    component.downloadExcel();
    expect(planService.downloadExcel).toHaveBeenCalled();
  });

  it('should handle activity change', () => {
    const event = { value: 'activity1', originalEvent: {} as Event };
    component.onActivityChange(event);
    expect(filterService.onActivityChange).toHaveBeenCalledWith(event);
  });

  it('should handle subactivity change', () => {
    const event = { value: 'subactivity1', originalEvent: {} as Event };
    component.onSubactivityChange(event);
    expect(filterService.onSubactivityChange).toHaveBeenCalledWith(event);
  });

  it('should handle eje change', () => {
    const event = { value: 'eje1', originalEvent: {} as Event };
    component.onEjeChange(event);
    expect(filterService.onEjeChange).toHaveBeenCalledWith(event);
  });

  it('should handle producto change', () => {
    const event = { value: 'producto1', originalEvent: {} as Event };
    component.onProductoChange(event);
    expect(filterService.onProductoChange).toHaveBeenCalledWith(event);
  });

  it('should not clear filters when no filters are applied', () => {
    filterService.hasFilters.mockReturnValue(false);
    component.clearFilters();
    expect(filterService.clearAllFilters).not.toHaveBeenCalled();
  });

  it('should clear filters when filters are applied', () => {
    filterService.hasFilters.mockReturnValue(true);
    component.clearFilters();
    expect(filterService.clearAllFilters).toHaveBeenCalled();
  });
});
