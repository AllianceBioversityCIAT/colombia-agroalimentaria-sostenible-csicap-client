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
        options: [
          {
            img: '/hero-section/character-admin.png',
            path: '/Planes operativos',
            title: 'Planes operativos',
            description: 'Acceda a los elementos transversales de CAS.'
          },
          {
            img: '/hero-section/character-admin.png',
            path: '/Gestión de usuarios',
            title: 'Gestión de usuarios',
            description: 'Explore los planes operativos de las organizaciones del proyecto.'
          },
          {
            img: '/hero-section/character-admin.png',
            path: '/Arquitectura',
            title: 'Arquitectura',
            description: 'Acceda a los elementos transversales de CAS.'
          }
        ],
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
