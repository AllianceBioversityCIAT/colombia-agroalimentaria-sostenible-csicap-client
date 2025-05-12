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
            title: 'Operational plans',
            description: 'Access CAS cross-cutting elements.'
          },
          {
            img: '/images/img1.jpg',
            path: '/Gestión de usuarios',
            title: 'User management',
            description: 'Explore operational plans of project organizations.'
          },
          {
            img: '/images/img1.jpg',
            path: '/Arquitectura',
            title: 'Architecture',
            description: 'Access CAS cross-cutting elements.'
          }
        ],
        description:
          'From this panel you can manage deliverables, check key dates, access the operational plan, and generate technical reports for the CSICAP project.'
      };
    if (this.authPermissions.isPuntoFocal())
      return {
        path: '/hero-section/character-focal.png',
        alt: 'Focal Point',
        title: 'Focal point',
        options: [],
        description:
          'From this panel you can manage deliverables, check key dates, access the operational plan, and generate technical reports for the CSICAP project.'
      };
    if (this.authPermissions.isObservador())
      return {
        path: '/hero-section/character-focal.png',
        alt: 'Observer',
        title: 'Observer',
        options: [],
        description: ''
      };
    return null;
  });
}
