import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPlanDetailComponent } from './operational-plan-detail.component';

describe('OperationalPlanDetailComponent', () => {
  let component: OperationalPlanDetailComponent;
  let fixture: ComponentFixture<OperationalPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalPlanDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
