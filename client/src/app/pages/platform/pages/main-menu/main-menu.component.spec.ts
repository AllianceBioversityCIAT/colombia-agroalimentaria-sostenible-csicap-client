import { ComponentFixture, TestBed } from '@angular/core/testing';
import MainMenuComponent from './main-menu.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuComponent, ButtonModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
