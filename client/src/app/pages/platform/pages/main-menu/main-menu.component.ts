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
    if (this.authPermissions.isAdmin())
      return {
        path: '/hero-section/character-admin.png',
        alt: 'Administrador',
        title: 'Administrador',
        description:
          'Desde este panel puede gestionar entregables, consultar fechas clave, acceder al plan operativo y generar reportes técnicos del proyecto CSICAP.'
      };
    if (this.authPermissions.isPuntoFocal())
      return {
        path: '/hero-section/character-focal.png',
        alt: 'Punto Focal',
        title: 'Punto focal',
        description:
          'Desde este panel puede gestionar entregables, consultar fechas clave, acceder al plan operativo y generar reportes técnicos del proyecto CSICAP.'
      };
    if (this.authPermissions.isObservador())
      return {
        path: '/hero-section/character-focal.png',
        alt: 'Observador',
        title: 'Observador'
      };
    return { path: '', alt: '', title: '', description: '' };
  });
}
