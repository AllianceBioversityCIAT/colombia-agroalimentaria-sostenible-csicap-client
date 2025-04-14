import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ToolbarComponent from './toolbar.component';
import { CacheService } from '../../services/cache/cache.service';
import { signal } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockCacheService: { dataCache: any };

  beforeEach(async () => {
    mockCacheService = {
      dataCache: signal({
        user: {
          nombre: 'Test',
          apellido: 'User',
          rolesPersonas: [
            {
              rol: {
                nombre: 'Admin'
              }
            }
          ]
        }
      })
    };

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: [{ provide: CacheService, useValue: mockCacheService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and update suggestions', () => {
    const event = { query: 'test' } as AutoCompleteCompleteEvent;
    component.search(event);
    expect(component.suggestions?.length).toBe(10);
  });

  it('should compute name initials correctly', () => {
    expect(component.getNameInitiales()).toBe('TU');
  });
});
