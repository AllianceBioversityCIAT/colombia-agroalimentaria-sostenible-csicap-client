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
import { TextLimiterPipe } from '../../../../../../shared/pipes/text-limiter.pipe';
import { DateFormatterPipe } from '../../../../../../shared/pipes/date-formatter.pipe';
import { ActivatedRoute } from '@angular/router';

// Mock para ResizeObserver utilizado por PrimeNG Tabs
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// Mock de datos para el componente
const mockData = {
  hitosxsubproducto: [
    {
      id_producto: 1,
      nombre_producto: 'Producto de prueba',
      ejes: ['Eje 1'],
      subproductos: [
        {
          id_subproducto: 1,
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
  subproductos: [
    {
      sp_id: 1,
      sp_nombre: 'Nombre SP',
      subproducto_index: 'SP-1'
    }
  ]
};

// Mock para ApiService
const mockApiService = {
  getSubProductos: jest.fn().mockResolvedValue({
    data: mockData
  })
};

// Mock para ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    params: {
      id: '1'
    }
  }
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
        DialogModule,
        TextLimiterPipe,
        DateFormatterPipe
      ],
      providers: [
        provideNoopAnimations(),
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeByproductsComponent);
    component = fixture.componentInstance;

    // Inicializar señales con valores por defecto para evitar errores en la plantilla
    component.dialogVisible.set({ value: false });
    component.data.set(mockData);
    component.currentSubproducto.set(mockData.hitosxsubproducto[0].subproductos[0]);
    component.currentProducto.set(mockData.hitosxsubproducto[0]);
    component.subproductos.set(mockData.subproductos);

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
