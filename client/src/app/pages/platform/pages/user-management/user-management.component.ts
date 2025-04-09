import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { TableModule } from 'primeng/table';
import { GetUsers } from '../../../../shared/interfaces/get/get-users-interface';

@Component({
  selector: 'app-user-management',
  imports: [TableModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  api = inject(ApiService);
  users = signal<GetUsers[]>([]);

  columns = signal<Record<string, string>[]>([
    { field: 'persona_nombre', header: 'Nombre' },
    { field: 'persona_apellido', header: 'Apellido' },
    { field: 'organizacion_nombre_corto', header: 'Organización', styles: 'min-width: 160px' },
    { field: 'persona_email', header: 'Correo electrónico' },
    { field: 'rol_nombre', header: 'Rol' },
    { field: 'nombre', header: 'Eje' },
    { header: 'Acciones' }
  ]);

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getOrganizationsIds();
    this.getGCFComponentesIds();
  }

  async getUsers() {
    const users = await this.api.getUsers();
    this.users.set(users.data);
  }

  async getOrganizationsIds() {
    const organizationsIds = await this.api.getOrganizationsIds();
    console.log(organizationsIds);
  }

  async getGCFComponentesIds() {
    const gcfComponentesIds = await this.api.getGCFComponentesIds({});
    console.log(gcfComponentesIds);
  }

  async getRoles() {
    const roles = await this.api.getRoles();
    console.log(roles);
  }
}
