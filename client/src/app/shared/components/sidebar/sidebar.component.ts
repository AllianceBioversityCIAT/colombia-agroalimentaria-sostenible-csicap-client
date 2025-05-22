import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ActionsService } from '../../services/actions.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';
import { CommonModule, Location } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AuthPermissionsService } from '../../services/auth-permissions.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface SidebarSubItem {
  icon: string;
  label: string;
  path?: string;
  disabled?: boolean;
  hidden?: boolean;
}

interface SidebarItem {
  icon: string;
  label: string;
  action?: () => void;
  path?: string;
  disabled?: boolean;
  options?: SidebarSubItem[];
  expanded?: boolean;
  unauthorized?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, OverlayBadgeModule, RouterLink, RouterLinkActive, TooltipModule],
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('submenuAnimation', [
      state(
        'collapsed',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '0',
          padding: '0'
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1'
        })
      ),
      transition('collapsed <=> expanded', [animate('200ms ease-in-out')])
    ])
  ]
})
export default class SidebarComponent implements OnInit {
  actions = inject(ActionsService);
  cache = inject(CacheService);
  authPermissions = inject(AuthPermissionsService);
  location = inject(Location);
  expandedItems = signal<Record<string, boolean>>({});

  menuItems = computed<SidebarItem[]>(() => [
    { icon: 'pi-home', label: 'Menú principal', path: 'menu-principal' },
    { icon: 'pi-sitemap', label: 'Arquitectura', path: 'arquitectura', hidden: !this.authPermissions.isAdmin() },
    {
      icon: 'pi-chart-line',
      label: this.authPermissions.isAdmin() ? 'Planes operativos' : 'Plan operativo',
      path: this.authPermissions.isAdmin() ? 'planes-operativos' : 'planes-operativos/cenicafe'
    },
    { icon: 'pi-folder', label: 'Gestión de entregables.', path: 'gestion-entregables', disabled: true, hidden: this.authPermissions.isAdmin() },
    { icon: 'pi-users', label: 'Mi equipo de trabajo.', path: 'mi-equipo-trabajo', disabled: true, hidden: this.authPermissions.isAdmin() },
    { icon: 'pi-user-edit', label: 'Gestión de usuarios', path: 'gestion-usuarios', unauthorized: !this.authPermissions.isAdmin() },
    {
      icon: 'pi-calendar',
      label: 'Fechas clave',
      options: [
        { icon: 'pi-box', label: 'Fechas de corte', path: 'fechas-clave/fechas-de-corte' },
        { icon: 'pi-box', label: 'Fechas de subproducto', path: 'fechas-clave/fechas-subproducto', disabled: true }
      ]
    },
    { icon: 'pi-file', label: 'Indicadores', path: 'indicadores', disabled: true, hidden: this.authPermissions.isAdmin() },
    {
      icon: 'pi-question-circle',
      label: this.authPermissions.isAdmin() ? 'Acerca de roles' : 'Acerca de mi rol',
      path: 'acerca-roles',
      disabled: true
    }
  ]);

  accountItems = signal<SidebarItem[]>([
    { icon: 'pi-cog', label: 'Ajustes', disabled: true },
    { icon: 'pi-sign-out', label: 'Cerrar sesión', action: () => this.actions.logOut() }
  ]);

  ngOnInit() {
    if ((this.cache.hasSmallScreenWidth() || this.cache.hasSmallScreen()) && !this.cache.isSidebarCollapsed()) {
      this.cache.toggleSidebar();
    }

    // Inicializar expandedItems
    this.menuItems().forEach(item => {
      if (item.options && item.options.length > 0) {
        this.expandedItems.update(state => ({ ...state, [item.label]: false }));
      }
    });
  }

  toggleSubmenu(item: SidebarItem): void {
    if (item.options && item.options.length > 0) {
      this.expandedItems.update(state => ({
        ...state,
        [item.label]: !state[item.label]
      }));
    }
  }

  isExpanded(item: SidebarItem): boolean {
    return this.expandedItems()[item.label] || false;
  }
}
