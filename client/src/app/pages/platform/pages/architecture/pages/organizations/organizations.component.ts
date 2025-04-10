import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { TableModule } from 'primeng/table';
import { GetOrganizationsDetail } from '../../../../../../shared/interfaces/get/get-organizations-detail.interface';
import { SectionHeaderComponent } from "../../../../../../shared/components/section-header/section-header.component";

interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-organizations',
  imports: [TableModule, SectionHeaderComponent, SectionHeaderComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export default class OrganizationsComponent implements OnInit {
  api = inject(ApiService);
  organizations = signal<GetOrganizationsDetail[]>([]);
  tableColumns = signal<TableColumn[]>([
    { field: 'nombre_corto', header: 'Nombre Corto' },
    { field: 'nombre', header: 'Nombre Largo' },
    { field: 'tipo_organizacion', header: 'Tipo de Organización' },
    { field: 'proposito', header: 'Proposito' },
    { field: 'sistemas_productivos', header: 'Sistemas productivos' },
    { field: 'datos_contacto', header: 'Datos de organización' },
    { field: 'direccion', header: 'Dirección física' },
    { field: 'logo', header: 'Logo' }
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
