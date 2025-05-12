import { Component, computed, inject } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthPermissionsService } from 'src/app/shared/services/auth-permissions.service';

interface PanelOption {
  img: string;
  path: string;
  title: string;
  description: string;
  buttonLabel?: string;
}

interface UserPanelData {
  path: string;
  alt: string;
  title: string;
  options: PanelOption[];
  description: string;
}

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './main-menu.component.html'
})
export default class MainMenuComponent {
  authPermissions = inject(AuthPermissionsService);

  getUserPanelData = computed<UserPanelData | null>(() => {
    if (this.authPermissions.isAdmin())
      return {
        path: '/hero-section/character-admin.png',
        alt: 'Administrador',
        title: 'Administrador',
        options: [
          {
            img: '/images/img1.jpg',
            path: '/Planes operativos',
            title: 'Planes operativos',
            description: 'Acceda a los elementos transversales de CAS.',
            buttonLabel: 'Ver planes operativos'
          },
          {
            img: '/images/img1.jpg',
            path: '/Gestión de usuarios',
            title: 'Gestión de usuarios',
            description: 'Explore los planes operativos de las organizaciones del proyecto.',
            buttonLabel: 'Ver gestión de usuarios'
          },
          {
            img: '/images/img1.jpg',
            path: '/Arquitectura',
            title: 'Arquitectura',
            description: 'Acceda a los elementos transversales de CAS.',
            buttonLabel: 'Ver arquitectura'
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
        options: [
          {
            img: '/images/img1.jpg',
            path: '/Mi plan operativo',
            title: 'Mi plan operativo',
            description: 'Consolidación de informacion para generar el reporte técnico consolidado.',
            buttonLabel: 'Ver plan operativo'
          },
          {
            img: '/images/img1.jpg',
            path: '/Mis entregables',
            title: 'Mis entregables',
            description: 'Gestione la documentación requerida según los entregables definidos.',
            buttonLabel: 'Ver mis entregables'
          },
          {
            img: '/images/img1.jpg',
            path: '/Generar reportes',
            title: 'Generar reportes',
            description: 'Consolidación de información para generar el reporte técnico consolidado.',
            buttonLabel: 'Generar reportes'
          }
        ],
        description:
          'Desde este panel puede gestionar entregables, consultar fechas clave, acceder al plan operativo y generar reportes técnicos del proyecto CSICAP.'
      };
    if (this.authPermissions.isObservador())
      return {
        path: '/hero-section/character-focal.png',
        alt: 'Observador',
        title: 'Observador',
        options: [],
        description: ''
      };
    return null;
  });
}
