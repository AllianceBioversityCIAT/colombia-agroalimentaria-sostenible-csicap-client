import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { GetUsers } from '../../../../shared/interfaces/get/get-users-interface';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-user-management',
  imports: [TableModule, SectionHeaderComponent, SelectModule, ButtonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  api = inject(ApiService);
  users = signal<GetUsers[]>([]);
  organizationsIds = signal<{ id: number; nombre_corto: string }[]>([]);
  roles = signal<{ id: number; nombre: string }[]>([]);
  gcfComponentesIds = signal<{ id: number; nombre: string }[]>([]);
  organizationSelected = signal<number | null>(null);
  roleSelected = signal<number | null>(null);
  gcfComponenteSelected = signal<number | null>(null);

  @ViewChild('organizationFilter') organizationFilter!: Select;
  @ViewChild('roleFilter') roleFilter!: Select;
  @ViewChild('gcfComponenteFilter') gcfComponenteFilter!: Select;

  columns = signal<Record<string, string>[]>([
    { field: 'persona_nombre', header: 'Nombre' },
    { field: 'persona_apellido', header: 'Apellido' },
    { field: 'organizacion_nombre_corto', header: 'Organización', styles: 'min-width: 160px' },
    { field: 'persona_email', header: 'Correo electrónico' },
    { field: 'rol_nombre', header: 'Rol' },
    { field: 'nombre', header: 'Eje' }
    // { header: 'Acciones' }
  ]);

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getOrganizationsIds();
    this.getGCFComponentesIds();
  }

  clearFilters() {
    this.organizationSelected.set(null);
    this.roleSelected.set(null);
    this.gcfComponenteSelected.set(null);

    // Limpiar los selects visualmente
    if (this.organizationFilter) {
      this.organizationFilter.clear();
    }
    if (this.roleFilter) {
      this.roleFilter.clear();
    }
    if (this.gcfComponenteFilter) {
      this.gcfComponenteFilter.clear();
    }

    this.getUsers();
  }

  setOrganizationSelected(event: SelectItem) {
    console.log('hola');
    console.log(event.value);
    this.organizationSelected.set(event.value.id);
    this.getUsers();
  }

  setRoleSelected(event: SelectItem) {
    this.roleSelected.set(event.value.id);
    this.getUsers();
  }

  setGCFComponenteSelected(event: SelectItem) {
    this.gcfComponenteSelected.set(event.value.id);
    this.getUsers();
  }

  async getUsers() {
    const users = await this.api.getUsers({
      organizacion: this.organizationSelected(),
      rol: this.roleSelected(),
      eje: this.gcfComponenteSelected()
    });
    this.users.set(users.data);
  }

  async getOrganizationsIds() {
    const organizationsIds = await this.api.getOrganizationsIds();
    console.log(organizationsIds);
    this.organizationsIds.set(organizationsIds.data);
  }

  async getGCFComponentesIds() {
    const gcfComponentesIds = await this.api.getGCFComponentesIds();
    console.log(gcfComponentesIds);
    this.gcfComponentesIds.set(gcfComponentesIds.data);
  }

  async getRoles() {
    const roles = await this.api.getRoles();
    console.log(roles);
    this.roles.set(roles.data);
  }
}
