import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import KeyDatesComponent from './key-dates.component';

describe('KeyDatesComponent', () => {
  let component: KeyDatesComponent;
  let fixture: ComponentFixture<KeyDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyDatesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
