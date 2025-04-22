import { Component, inject, OnInit, signal } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ActionsService } from '../../services/actions.service';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
interface SidebarItem {
  icon: string;
  label: string;
  action?: () => void;
  path?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, OverlayBadgeModule, RouterLink, RouterLinkActive, TooltipModule],
  templateUrl: './sidebar.component.html'
})
export default class SidebarComponent implements OnInit {
  actions = inject(ActionsService);
  cache = inject(CacheService);

  menuItems = signal<SidebarItem[]>([
    { icon: 'pi-home', label: 'Menú principal', path: 'menu-principal' },
    { icon: 'pi-sitemap', label: 'Arquitectura', path: 'arquitectura' },
    { icon: 'pi-chart-line', label: 'Planes operativos', path: 'planes-operativos' },
    { icon: 'pi-user-edit', label: 'Gestión de usuarios', path: 'gestion-usuarios' },
    { icon: 'pi-question-circle', label: 'Acerca de roles', path: 'acerca-roles', disabled: true },
    { icon: 'pi-calendar', label: 'Fechas clave', path: 'fechas-clave', disabled: true }
  ]);

  accountItems = signal<SidebarItem[]>([
    { icon: 'pi-cog', label: 'Ajustes', disabled: true },
    { icon: 'pi-sign-out', label: 'Cerrar sesión', action: () => this.actions.logOut() }
  ]);

  ngOnInit() {
    if ((this.cache.hasSmallScreenWidth() || this.cache.hasSmallScreen()) && !this.cache.isSidebarCollapsed()) {
      this.cache.toggleSidebar();
    }
  }
}
