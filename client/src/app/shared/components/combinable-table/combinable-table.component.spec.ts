import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinableTableComponent } from './combinable-table.component';

describe('CombinableTableComponent', () => {
  let component: CombinableTableComponent;
  let fixture: ComponentFixture<CombinableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinableTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
