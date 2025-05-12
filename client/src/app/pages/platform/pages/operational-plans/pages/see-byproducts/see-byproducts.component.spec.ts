import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeByproductsComponent } from './see-byproducts.component';

describe('SeeByproductsComponent', () => {
  let component: SeeByproductsComponent;
  let fixture: ComponentFixture<SeeByproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeByproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeByproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
