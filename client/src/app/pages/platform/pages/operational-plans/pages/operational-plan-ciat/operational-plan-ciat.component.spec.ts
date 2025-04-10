import { ComponentFixture, TestBed } from '@angular/core/testing';
import OperationalPlanCiatComponent from './operational-plan-ciat.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';

jest.mock('../../../../../../shared/services/api.service');

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('OperationalPlanCiatComponent', () => {
  let component: OperationalPlanCiatComponent;
  let fixture: ComponentFixture<OperationalPlanCiatComponent>;
  let apiService: jest.Mocked<ApiService>;

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  beforeEach(async () => {
    const mockApiService = {
      getPlanOperativoCiat: jest.fn().mockResolvedValue({
        data: [
          {
            id_obj: 1,
            actividades: []
          }
        ]
      })
    };

    await TestBed.configureTestingModule({
      imports: [OperationalPlanCiatComponent, TableModule, TabsModule, SectionHeaderComponent],
      providers: [{ provide: ApiService, useValue: mockApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalPlanCiatComponent);
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

  it('should initialize objectives after ngOnInit', async () => {
    expect(component.objectives()).toEqual([]);
    await component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    const objectives = component.objectives();
    expect(objectives).toEqual([
      {
        id_obj: 1,
        actividades: []
      }
    ]);
  });

  it('should call getPlanOperativoCiat on init', async () => {
    await component.ngOnInit();
    expect(apiService.getPlanOperativoCiat).toHaveBeenCalled();
  });
});
