import { Routes } from '@angular/router';
import { rolesGuard } from './shared/guards/roles.guard';
import { permissionGuard } from './shared/guards/permission.guard';

export const routes: Routes = [
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/platform/pages/unauthorized/unauthorized.component')
  },
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
        loadComponent: () => import('./pages/platform/pages/architecture/architecture.component'),
        data: {
          breadcrumb: [{ path: 'arquitectura', label: 'Arquitectura' }]
        }
      },
      {
        path: 'arquitectura/componentes-y-ejes',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/components-and-axes/components-and-axes.component'),
        data: {
          breadcrumb: [
            { path: 'arquitectura', label: 'Arquitectura' },
            { path: 'componentes-y-ejes', label: 'Componentes y ejes' }
          ]
        }
      },
      {
        path: 'arquitectura/ficha-bpin',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/bpin-form/bpin-form.component'),
        data: {
          breadcrumb: [
            { path: 'arquitectura', label: 'Arquitectura' },
            { path: 'ficha-bpin', label: 'Ficha BPIN' }
          ]
        }
      },
      {
        path: 'arquitectura/ficha-gcf',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/gcf-form/gcf-form.component'),
        data: {
          breadcrumb: [
            { path: 'arquitectura', label: 'Arquitectura' },
            { path: 'ficha-gcf', label: 'Ficha GCFE' }
          ]
        }
      },
      {
        path: 'arquitectura/organizaciones',
        loadComponent: () => import('./pages/platform/pages/architecture/pages/organizations/organizations.component'),
        data: {
          breadcrumb: [
            { path: 'arquitectura', label: 'Arquitectura' },
            { path: 'organizaciones', label: 'Organizaciones' }
          ]
        }
      },
      {
        path: 'planes-operativos',
        loadComponent: () => import('./pages/platform/pages/operational-plans/operational-plans.component'),
        canActivate: [permissionGuard(['can_view_all_operational_plans'])],
        data: {
          breadcrumb: [{ path: 'planes-operativos', label: 'Planes operativos' }]
        }
      },
      // {
      //   path: 'planes-operativos/ciat',
      //   loadComponent: () => import('./pages/platform/pages/operational-plans/pages/operational-plan-ciat/operational-plan-ciat.component'),
      //   data: {
      //     breadcrumb: [
      //       { path: 'planes-operativos', label: 'Planes operativos' },
      //       { path: 'ciat', label: 'CIAT' }
      //     ]
      //   }
      // },
      {
        path: 'planes-operativos/:id',
        loadComponent: () => import('./pages/platform/pages/operational-plans/pages/operational-plan-ciat/operational-plan-ciat.component'),
        data: {
          breadcrumb: [{ path: 'planes-operativos', label: 'Planes operativos' }]
        }
      },
      {
        path: 'planes-operativos/ver-subproductos/:id',
        loadComponent: () => import('./pages/platform/pages/operational-plans/pages/see-byproducts/see-byproducts.component'),
        data: {
          breadcrumb: [
            { path: 'planes-operativos', label: 'Mi plan operativo', ifIsAdmin: true },
            { path: 'ver-subproductos', label: 'Ver subproductos' }
          ]
        }
      },
      {
        path: 'gestion-usuarios',
        loadComponent: () => import('./pages/platform/pages/user-management/user-management.component'),
        data: {
          breadcrumb: [{ path: 'gestion-usuarios', label: 'Gestión de usuarios' }]
        }
      },
      {
        path: 'fechas-clave/fechas-de-corte',
        loadComponent: () => import('./pages/platform/pages/key-dates/pages/cut-off-dates/cut-off-dates.component'),
        data: {
          breadcrumb: [
            { path: 'fechas-clave', label: 'Fechas clave' }
            // { path: 'fechas-de-corte', label: 'Fechas de corte' }
          ]
        }
      },
      {
        path: 'fechas-clave/fechas-de-subproducto',
        loadComponent: () => import('./pages/platform/pages/key-dates/pages/byproduct-dates/byproduct-dates.component'),
        data: {
          breadcrumb: [
            { path: 'fechas-clave', label: 'Fechas clave' },
            { path: 'fechas-de-subproducto', label: 'Fechas de subproducto' }
          ]
        }
      },
      {
        path: 'acerca-roles',
        loadComponent: () => import('./pages/platform/pages/about-roles/about-roles.component'),
        data: {
          breadcrumb: [{ path: 'acerca-roles', label: 'Acerca de roles' }]
        }
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
