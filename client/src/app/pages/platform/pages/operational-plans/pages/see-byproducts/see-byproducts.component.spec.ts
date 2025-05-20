import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import SeeByproductsComponent from './see-byproducts.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../../../shared/services/api.service';
import { DialogModule } from 'primeng/dialog';

// Mock para ResizeObserver utilizado por PrimeNG Tabs
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// Mock para ApiService
const mockApiService = {
  getSubProductos: jest.fn().mockResolvedValue({
    data: {
      hitosxsubproducto: [
        {
          subproductos: [
            {
              sp_id: 1,
              nombre_subproducto: 'Subproducto de prueba',
              que_se_hara: 'Descripción de prueba',
              metodologia: 'Metodología de prueba',
              como_se_reportara: 'Reporte de prueba',
              lugares: [],
              hitos: []
            }
          ]
        }
      ],
      subproductos: []
    }
  })
};

// Configuración global del mock
global.ResizeObserver = MockResizeObserver;

describe('SeeByproductsComponent', () => {
  let component: SeeByproductsComponent;
  let fixture: ComponentFixture<SeeByproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SeeByproductsComponent,
        ButtonModule,
        TooltipModule,
        CommonModule,
        RouterTestingModule,
        TabsModule,
        HttpClientTestingModule,
        DialogModule
      ],
      providers: [provideNoopAnimations(), { provide: ApiService, useValue: mockApiService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeByproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSubProductos on init', () => {
    const spy = jest.spyOn(component, 'getSubProductos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
