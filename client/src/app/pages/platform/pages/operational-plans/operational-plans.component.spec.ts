import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import OperationalPlansComponent from './operational-plans.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../shared/services/api.service';

describe('OperationalPlansComponent', () => {
  let component: OperationalPlansComponent;
  let fixture: ComponentFixture<OperationalPlansComponent>;
  let apiService: jest.Mocked<ApiService>;

  beforeEach(async () => {
    const mockApiService = {
      getOrganizations: jest.fn().mockResolvedValue({ data: [] })
    };

    await TestBed.configureTestingModule({
      imports: [OperationalPlansComponent, HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: mockApiService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalPlansComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty organizations array', () => {
    expect(component.organizations()).toEqual([]);
  });

  it('should call getOrganizations on init', async () => {
    await component.ngOnInit();
    expect(apiService.getOrganizations).toHaveBeenCalled();
  });
});
