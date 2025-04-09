import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb(): void {
    let route = this.activatedRoute.firstChild;
    this.items = [];

    while (route) {
      if (route.snapshot.data['breadcrumb']) {
        const breadcrumbData = route.snapshot.data['breadcrumb'];
        if (Array.isArray(breadcrumbData)) {
          breadcrumbData.forEach((item: string) => {
            this.items.push({
              label: item,
              routerLink: this.getRouterLink(item)
            });
          });
        }
      }
      route = route.firstChild;
    }
  }

  private getRouterLink(label: string): string {
    // Convertir el label a un formato de URL válido
    const path = label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    // Si es 'arquitectura', devolver la ruta base
    if (path === 'arquitectura') {
      return '/arquitectura';
    }

    // Para otros casos, construir la ruta completa
    return this.router.url;
  }
}
