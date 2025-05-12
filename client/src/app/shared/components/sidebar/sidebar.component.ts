import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ActionsService } from '../../services/actions.service';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AuthPermissionsService } from '../../services/auth-permissions.service';
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
  authPermissions = inject(AuthPermissionsService);
  menuItems = computed<SidebarItem[]>(() => [
    { icon: 'pi-home', label: 'Menú principal', path: 'menu-principal' },
    { icon: 'pi-sitemap', label: 'Arquitectura', path: 'arquitectura' },
    {
      icon: 'pi-chart-line',
      label: this.authPermissions.isAdmin() ? 'Planes operativos' : 'Mi Plan operativo',
      path: this.authPermissions.isAdmin() ? 'planes-operativos' : 'planes-operativos/4'
    },
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
