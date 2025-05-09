import { Component, computed, inject } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthPermissionsService } from 'src/app/shared/services/auth-permissions.service';
@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './main-menu.component.html'
})
export default class MainMenuComponent {
  authPermissions = inject(AuthPermissionsService);

  getCharacterImg = computed(() => {
    if (this.authPermissions.isAdmin()) return '/hero-section/character-admin.png';
    if (this.authPermissions.isObservador()) return '/hero-section/character-focal.png';
    if (this.authPermissions.isPuntoFocal()) return '/hero-section/character-focal.png';
    return '';
  });
}
