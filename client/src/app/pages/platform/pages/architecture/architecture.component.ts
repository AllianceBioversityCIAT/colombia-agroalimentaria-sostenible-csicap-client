import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';

// PrimeNG
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [ButtonModule, SectionHeaderComponent, RouterLink],
  templateUrl: './architecture.component.html'
})
export default class ArchitectureComponent {}
