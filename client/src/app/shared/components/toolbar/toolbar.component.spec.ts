import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ToolbarComponent from './toolbar.component';
import { CacheService } from '../../services/cache/cache.service';
import { signal } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    const mockCacheService = {
      dataCache: signal({
        user: {
          nombre: 'Test',
          apellido: 'User'
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
});
