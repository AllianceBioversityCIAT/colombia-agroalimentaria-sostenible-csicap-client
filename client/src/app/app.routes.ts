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
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/platform/page/home/home.component')
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
