import { Component, inject, signal } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ActionsService } from '../../services/actions.service';
interface SidebarItem {
  icon: string;
  label: string;
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  imports: [OverlayBadgeModule],
  templateUrl: './sidebar.component.html'
})
export default class SidebarComponent {
  actions = inject(ActionsService);

  menuItems = signal<SidebarItem[]>([
    { icon: 'pi-home', label: 'Menu principal' },
    { icon: 'pi-sitemap', label: 'Arquitectura' },
    { icon: 'pi-chart-line', label: 'Planes operativos' },
    { icon: 'pi-user-edit', label: 'Gestión de usuarios' },
    { icon: 'pi-question-circle', label: 'Acerca de roles' },
    { icon: 'pi-calendar', label: 'Fechas clave' }
  ]);

  accountItems = signal<SidebarItem[]>([
    { icon: 'pi-cog', label: 'Ajustes' },
    { icon: 'pi-sign-out', label: 'Cerrar sesión', action: () => this.actions.logOut() }
  ]);
}
