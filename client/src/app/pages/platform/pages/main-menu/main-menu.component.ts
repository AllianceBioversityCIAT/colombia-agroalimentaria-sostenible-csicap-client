import { Component } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './main-menu.component.html'
})
export default class MainMenuComponent {}
