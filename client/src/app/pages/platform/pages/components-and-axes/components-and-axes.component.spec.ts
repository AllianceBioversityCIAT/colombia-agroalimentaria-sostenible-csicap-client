import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ComponentsAndAxesComponent  from './components-and-axes.component';

describe('ComponentsAndAxesComponent', () => {
  let component: ComponentsAndAxesComponent;
  let fixture: ComponentFixture<ComponentsAndAxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsAndAxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsAndAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
