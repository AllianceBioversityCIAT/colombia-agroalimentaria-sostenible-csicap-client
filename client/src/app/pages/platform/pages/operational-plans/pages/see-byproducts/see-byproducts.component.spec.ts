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

// Mock para ResizeObserver utilizado por PrimeNG Tabs
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// Configuración global del mock
global.ResizeObserver = MockResizeObserver;

describe('SeeByproductsComponent', () => {
  let component: SeeByproductsComponent;
  let fixture: ComponentFixture<SeeByproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeByproductsComponent, ButtonModule, TooltipModule, CommonModule, RouterTestingModule, TabsModule],
      providers: [provideNoopAnimations()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeByproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
