import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPlanCiatComponent } from './operational-plan-ciat.component';

describe('OperationalPlanCiatComponent', () => {
  let component: OperationalPlanCiatComponent;
  let fixture: ComponentFixture<OperationalPlanCiatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalPlanCiatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalPlanCiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
