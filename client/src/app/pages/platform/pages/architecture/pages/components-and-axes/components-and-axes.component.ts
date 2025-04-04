import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableComponent } from '@shared/components/custom-fields/table/table.component';
import { ApiService } from '@shared/services/api.service';

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

  componentsData = signal<any[]>([]);

  ngOnInit(): void {
    this.getGCFComponentes();
  }

  async getGCFComponentes() {
    const { data } = await this.api.getGCFComponentes();
    console.log(data);
    this.componentsData.set(data);
  }
}
