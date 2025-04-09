import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFichaBpinComponent } from './table-ficha-bpin.component';

describe('TableFichaBpinComponent', () => {
  let component: TableFichaBpinComponent;
  let fixture: ComponentFixture<TableFichaBpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFichaBpinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFichaBpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
