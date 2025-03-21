import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpinFormComponent } from './bpin-form.component';

describe('BpinFormComponent', () => {
  let component: BpinFormComponent;
  let fixture: ComponentFixture<BpinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpinFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
