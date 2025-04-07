import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcfFormComponent } from './gcf-form.component';

describe('GcfFormComponent', () => {
  let component: GcfFormComponent;
  let fixture: ComponentFixture<GcfFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GcfFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GcfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
