import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPlanComponent } from './operational-plan.component';

describe('OperationalPlanComponent', () => {
  let component: OperationalPlanComponent;
  let fixture: ComponentFixture<OperationalPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
