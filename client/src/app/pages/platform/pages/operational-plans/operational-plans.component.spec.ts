import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import OperationalPlansComponent from './operational-plans.component';

describe('OperationalPlansComponent', () => {
  let component: OperationalPlansComponent;
  let fixture: ComponentFixture<OperationalPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalPlansComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationalPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
