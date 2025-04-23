import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { TableModule } from 'primeng/table';
import { GetOrganizationsDetail } from '../../../../../../shared/interfaces/get/get-organizations-detail.interface';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { CommonModule } from '@angular/common';
import { CacheService } from '../../../../../../shared/services/cache/cache.service';

interface TableColumn {
  field: string;
  header: string;
  minWidth?: string;
}

@Component({
  selector: 'app-organizations',
  imports: [TableModule, SectionHeaderComponent, SectionHeaderComponent, CommonModule],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export default class OrganizationsComponent implements OnInit {
  api = inject(ApiService);
  cache = inject(CacheService);
  organizations = signal<GetOrganizationsDetail[]>([]);
  tableColumns = signal<TableColumn[]>([
    { field: 'nombre_corto', header: 'Nombre Corto' },
    { field: 'nombre', header: 'Nombre Largo', minWidth: '250px' },
    { field: 'tipo_organizacion', header: 'Tipo de Organización' },
    { field: 'proposito', header: 'Proposito', minWidth: '400px' },
    { field: 'sistemas_productivos', header: 'Sistemas productivos', minWidth: '200px' },
    { field: 'datos_contacto', header: 'Datos de organización' },
    { field: 'sistemas_productivos', header: 'Datos de contacto', minWidth: '200px' },
    { field: 'direccion', header: 'Dirección física', minWidth: '300px' },
    { field: 'logo', header: 'Logo', minWidth: '200px' }
  ]);

  ngOnInit() {
    this.getOrganizationDetails();
  }
  async getOrganizationDetails() {
    const response = await this.api.getOrganizationDetails();
    this.organizations.set(response.data);
    console.log(this.organizations());
  }
}
