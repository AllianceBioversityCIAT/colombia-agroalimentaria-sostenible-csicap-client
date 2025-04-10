import { ComponentFixture, TestBed } from '@angular/core/testing';
import MainMenuComponent from './main-menu.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuComponent, ButtonModule, HttpClientTestingModule, RouterTestingModule, RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map()
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('¡Bienvenido!');
  });

  it('should render all management cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.rounded-lg');
    expect(cards.length).toBe(4);
  });

  it('should have correct route links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button[routerLink]');

    const architectureButton = Array.from(buttons).find(button => button.getAttribute('routerLink') === '/arquitectura');
    const operationalPlansButton = Array.from(buttons).find(button => button.getAttribute('routerLink') === '/planes-operativos');

    expect(architectureButton).toBeTruthy();
    expect(operationalPlansButton).toBeTruthy();
  });

  it('should have disabled buttons for key dates and user management', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const disabledButtons = compiled.querySelectorAll('button[disabled]');
    expect(disabledButtons.length).toBe(2);
  });
});
