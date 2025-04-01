import { Component, inject, OnInit } from '@angular/core';
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

  componentsData = [
    {
      component: 'Componente 1',
      componentDescription: 'Agricultura digital y servicios climáticos...',
      axis: 'Eje 1',
      axisDescription: 'Fortalecimiento y modernización...'
    },
    {
      component: '',
      componentDescription: '',
      axis: 'Eje 2',
      axisDescription: 'Brindar apoyo a la toma de decisiones...'
    },
    {
      component: 'Componente 2',
      componentDescription: 'Mejoramiento genético, técnicas de manejo...',
      axis: 'Eje 3',
      axisDescription: 'Banco de semillas fortalecidas...'
    },
    {
      component: '',
      componentDescription: '',
      axis: 'Eje 4',
      axisDescription: 'Técnicas de manejo de cultivos específicas...'
    },
    {
      component: 'Componente 3',
      componentDescription: 'Modelos de negocio innovadores...',
      axis: 'Eje 5',
      axisDescription: 'Modelos de negocio novedosos e inclusivos...'
    },
    {
      component: '',
      componentDescription: '',
      axis: 'Eje 6',
      axisDescription: 'Servicios de asistencia técnica modernizados...'
    },
    {
      component: 'Componente transversal',
      componentDescription: 'Evaluación de impacto y monitoreo...',
      axis: 'Eje 7',
      axisDescription: 'Recopilar información y análisis de seguimiento...'
    },
    {
      component: '',
      componentDescription: '',
      axis: 'Eje 8',
      axisDescription: 'Cierre de brechas de género en cadenas productivas...'
    }
  ];

  ngOnInit(): void {
    this.getGCFComponentes();
  }

  async getGCFComponentes() {
    const response = await this.api.getGCFComponentes();
    console.log(response);
  }
}
