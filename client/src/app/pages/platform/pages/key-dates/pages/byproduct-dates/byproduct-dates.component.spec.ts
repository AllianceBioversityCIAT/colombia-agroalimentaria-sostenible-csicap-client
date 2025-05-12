import { ComponentFixture, TestBed } from '@angular/core/testing';

import ByproductDatesComponent from './byproduct-dates.component';

describe('ByproductDatesComponent', () => {
  let component: ByproductDatesComponent;
  let fixture: ComponentFixture<ByproductDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByproductDatesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ByproductDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
