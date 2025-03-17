import { ComponentFixture, TestBed } from '@angular/core/testing';
import AboutRolesComponent from './about-roles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AboutRolesComponent', () => {
  let component: AboutRolesComponent;
  let fixture: ComponentFixture<AboutRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutRolesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
