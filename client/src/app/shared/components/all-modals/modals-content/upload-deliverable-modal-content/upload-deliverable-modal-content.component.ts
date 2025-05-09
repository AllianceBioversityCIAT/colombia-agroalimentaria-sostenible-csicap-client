import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaComponent } from '@shared/components/custom-fields/textarea/textarea.component';
import { InputComponent } from '@shared/components/custom-fields/input/input.component';
@Component({
  selector: 'app-upload-deliverable-modal-content',
  imports: [FileUploadModule, ToastModule, TextareaComponent, InputComponent],
  templateUrl: './upload-deliverable-modal-content.component.html',
  styleUrl: './upload-deliverable-modal-content.component.scss',
  providers: [MessageService]
})
export class UploadDeliverableModalContentComponent {
  constructor(private readonly messageService: MessageService) {}
  onBasicUploadAuto() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode'
    });
  }
}
