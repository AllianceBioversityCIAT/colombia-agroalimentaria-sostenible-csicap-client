import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

interface BreadcrumbItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // Detectar cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.items = []; // Limpiar items antes de actualizar
        this.updateBreadcrumb();
      });

    // Cargar breadcrumb inicial
    this.updateBreadcrumb();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateBreadcrumb(): void {
    const route: ActivatedRouteSnapshot | null = this.activatedRoute.snapshot;

    // Buscar en los hijos de la ruta actual
    if (route.children && route.children.length > 0) {
      route.children.forEach(child => {
        if (child.data && child.data['breadcrumb']) {
          const breadcrumbData = child.data['breadcrumb'] as BreadcrumbItem[];
          // Asignar nuevos items solo si hay datos de breadcrumb
          if (breadcrumbData.length > 0) {
            this.items = breadcrumbData.map(item => ({
              label: item.label,
              routerLink: `/${item.path}`
            }));
          }
        }
      });
    }

    console.log('Route:', route);
    console.log('Items:', this.items);
  }
}
