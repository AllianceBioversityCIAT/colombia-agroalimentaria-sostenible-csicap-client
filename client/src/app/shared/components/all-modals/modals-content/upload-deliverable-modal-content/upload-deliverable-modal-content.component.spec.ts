import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDeliverableModalContentComponent } from './upload-deliverable-modal-content.component';

describe('UploadDeliverableModalContentComponent', () => {
  let component: UploadDeliverableModalContentComponent;
  let fixture: ComponentFixture<UploadDeliverableModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDeliverableModalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDeliverableModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
