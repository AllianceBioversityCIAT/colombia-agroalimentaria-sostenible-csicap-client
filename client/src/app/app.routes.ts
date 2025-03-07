import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component')
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component')
  },
  {
    path: 'platform',
    loadComponent: () => import('./pages/platform/platform.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/platform/page/home/home.component')
      }
    ]
  }
];
