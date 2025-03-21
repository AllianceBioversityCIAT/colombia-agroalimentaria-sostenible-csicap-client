import { Routes } from '@angular/router';
import { rolesGuard } from './shared/guards/roles.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component')
  },
  {
    path: '',
    loadComponent: () => import('./pages/platform/platform.component'),
    canMatch: [rolesGuard],
    data: {
      isLoggedIn: true
    },
    children: [
      {
        path: '',
        redirectTo: 'menu-principal',
        pathMatch: 'full'
      },
      {
        path: 'menu-principal',
        loadComponent: () => import('./pages/platform/pages/main-menu/main-menu.component')
      },
      {
        path: 'arquitectura',
        loadComponent: () => import('./pages/platform/pages/architecture/architecture.component')
      },
      {
        path: 'arquitectura/componentes-y-ejes',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/components-and-axes/components-and-axes.component')
      },
      {
        path: 'arquitectura/ficha-bpin',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/bpin-form/bpin-form.component')
      },
      {
        path: 'planes-operativos',
        loadComponent: () => import('./pages/platform/pages/operational-plans/operational-plans.component')
      },
      {
        path: 'gestion-usuarios',
        loadComponent: () => import('./pages/platform/pages/user-management/user-management.component')
      },
      {
        path: 'acerca-roles',
        loadComponent: () => import('./pages/platform/pages/about-roles/about-roles.component')
      },
      {
        path: 'fechas-clave',
        loadComponent: () => import('./pages/platform/pages/key-dates/key-dates.component')
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component'),
    canMatch: [rolesGuard],
    data: {
      isLoggedIn: false
    }
  }
];
