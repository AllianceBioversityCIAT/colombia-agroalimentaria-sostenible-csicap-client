import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOperationalPlanComponent } from './partner-operational-plan.component';

describe('PartnerOperationalPlanComponent', () => {
  let component: PartnerOperationalPlanComponent;
  let fixture: ComponentFixture<PartnerOperationalPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerOperationalPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerOperationalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
