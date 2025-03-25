import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';

// PrimeNG
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [ButtonModule, SectionHeaderComponent],
  templateUrl: './architecture.component.html'
})
export default class ArchitectureComponent {}
