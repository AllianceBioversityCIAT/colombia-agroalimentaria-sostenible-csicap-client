import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Table, TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { GetUsers } from '../../../../shared/interfaces/get/get-users-interface';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-user-management',
  imports: [
    TableModule,
    FormsModule,
    SectionHeaderComponent,
    SelectModule,
    ButtonModule,
    SkeletonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DrawerModule,
    UserFormComponent
  ],
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
  isTableLoading = signal<boolean>(false);
  searchInput = signal<HTMLInputElement | null>(null);
  @ViewChild('organizationFilter') organizationFilter!: Select;
  @ViewChild('roleFilter') roleFilter!: Select;
  @ViewChild('gcfComponenteFilter') gcfComponenteFilter!: Select;
  @ViewChild('usersTable') table!: Table;

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

  get hasFilters() {
    return (
      !!this.organizationSelected() ||
      !!this.roleSelected() ||
      !!this.gcfComponenteSelected() ||
      this.searchInput() !== null
    );
  }

  clearFilters() {
    if (!this.hasFilters) {
      return;
    }

    this.organizationSelected.set(null);
    this.roleSelected.set(null);
    this.gcfComponenteSelected.set(null);

    if (this.organizationFilter) {
      this.organizationFilter.clear();
    }
    if (this.roleFilter) {
      this.roleFilter.clear();
    }
    if (this.gcfComponenteFilter) {
      this.gcfComponenteFilter.clear();
    }
    if (this.searchInput) {
      this.searchInput.set(null);
    }

    this.getUsers();
  }

  setOrganizationSelected(event: SelectItem) {
    this.organizationSelected.set(event?.value?.id);
    this.searchInput.set(null);
    this.getUsers();
  }

  setRoleSelected(event: SelectItem) {
    this.roleSelected.set(event?.value?.id);
    this.searchInput.set(null);
    this.getUsers();
  }

  setGCFComponenteSelected(event: SelectItem) {
    this.gcfComponenteSelected.set(event?.value?.id);
    this.searchInput.set(null);
    this.getUsers();
  }

  async getUsers() {
    this.isTableLoading.set(true);
    const users = await this.api.getUsers({
      organizacion: this.organizationSelected(),
      rol: this.roleSelected(),
      eje: this.gcfComponenteSelected()
    });
    this.users.set(users.data);
    this.table.reset();
    this.isTableLoading.set(false);
  }

  async getOrganizationsIds() {
    const organizationsIds = await this.api.getOrganizationsIds();
    this.organizationsIds.set(organizationsIds.data);
  }

  async getGCFComponentesIds() {
    const gcfComponentesIds = await this.api.getGCFComponentesIds();
    this.gcfComponentesIds.set(gcfComponentesIds.data);
  }

  async getRoles() {
    const roles = await this.api.getRoles();
    this.roles.set(roles.data);
  }
}
