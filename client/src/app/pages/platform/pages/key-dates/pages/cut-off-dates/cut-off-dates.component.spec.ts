import { ComponentFixture, TestBed } from '@angular/core/testing';

import CutOffDatesComponent from './cut-off-dates.component';

describe('CutOffDatesComponent', () => {
  let component: CutOffDatesComponent;
  let fixture: ComponentFixture<CutOffDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutOffDatesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CutOffDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
