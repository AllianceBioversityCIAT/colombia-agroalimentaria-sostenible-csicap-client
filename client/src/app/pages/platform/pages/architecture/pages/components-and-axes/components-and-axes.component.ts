import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableComponent } from '@shared/components/custom-fields/table/table.component';
import { ApiService } from '@shared/services/api.service';
import { GCFComponente } from '@shared/interfaces/gcf.interface';

interface ComponenteTabla {
  component: string;
  componentDescription: string;
  axis: string;
  axisDescription: string;
  rowspan: number;
}

@Component({
  selector: 'app-components-and-axes',
  standalone: true,
  imports: [TableModule, ButtonModule, SectionHeaderComponent, TableComponent],
  templateUrl: './components-and-axes.component.html',
  styleUrls: []
})
export default class ComponentsAndAxesComponent implements OnInit {
  api = inject(ApiService);
  tableColumns = [
    { field: 'component', header: 'Componentes' },
    { field: 'componentDescription', header: 'Descripción del componente' },
    { field: 'axis', header: 'Ejes del componente' },
    { field: 'axisDescription', header: 'Descripción del eje' }
  ];

  componentsData: ComponenteTabla[] = [];

  ngOnInit(): void {
    this.getGCFComponentes();
  }

  async getGCFComponentes() {
    const response = await this.api.getGCFComponentes();
    console.log(response.data);
    this.componentsData = response.data.flatMap((component: GCFComponente) =>
      component.gcfEjes.map((eje, index) => ({
        component: component.nombre,
        componentDescription: component.descripcion,
        axis: eje.nombre,
        axisDescription: eje.descripcion,
        rowspan: index === 0 ? component.gcfEjes.length : 0
      }))
    );
  }
}
