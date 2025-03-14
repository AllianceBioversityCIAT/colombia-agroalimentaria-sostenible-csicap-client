import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRolesComponent } from './about-roles.component';

describe('AboutRolesComponent', () => {
  let component: AboutRolesComponent;
  let fixture: ComponentFixture<AboutRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
