import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyDatesComponent } from './key-dates.component';

describe('KeyDatesComponent', () => {
  let component: KeyDatesComponent;
  let fixture: ComponentFixture<KeyDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
