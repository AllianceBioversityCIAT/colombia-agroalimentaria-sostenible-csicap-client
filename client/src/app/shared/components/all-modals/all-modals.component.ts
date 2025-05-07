import { Component, inject } from '@angular/core';
import { CreateResultManagementService } from './modals-content/create-result-modal/services/create-result-management.service';
import { ModalComponent } from './modal/modal.component';
import { UploadDeliverableModalContentComponent } from './modals-content/upload-deliverable-modal-content/upload-deliverable-modal-content.component';

@Component({
  selector: 'app-all-modals',
  imports: [ModalComponent, UploadDeliverableModalContentComponent],
  templateUrl: './all-modals.component.html'
})
export class AllModalsComponent {
  createResultManagementService = inject(CreateResultManagementService);

  clearModal = () => {
    setTimeout(() => {
      this.createResultManagementService.resultPageStep.set(0);
    }, 300);
  };
}
