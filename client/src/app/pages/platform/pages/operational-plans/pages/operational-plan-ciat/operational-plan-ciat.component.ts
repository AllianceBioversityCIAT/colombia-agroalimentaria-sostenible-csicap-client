import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { TableColumn } from '../../../../../../shared/components/custom-fields/table/table.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import {
  Actividad,
  GetOperationalPlanCiat
} from '../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface Tabs {
  title: string;
  value: number;
  activities: Activity[];
}

interface Activity {
  activityCode: string;
  activity: string;
  subActivityCode: string;
  subActivity: string;
}

interface TableActivity {
  nombre_actv: string;
  rowspan: number;
  nombre_subActv: string;
  codigo_subActv: string;
  budget: string;
  axis: string;
  responsible: string;
  productNumber: string;
  product: string;
  productDescription: string;
  deliveryDate: string;
}

@Component({
  selector: 'app-operational-plan-ciat',
  imports: [SectionHeaderComponent, TabsModule, TableModule, DatePipe, ButtonModule],
  templateUrl: './operational-plan-ciat.component.html',
  styleUrl: './operational-plan-ciat.component.scss'
})
export default class OperationalPlanCiatComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;
  api = inject(ApiService);

  columns: TableColumn[] = [
    { field: 'activity', header: 'Actividad', minWidth: '300px' },
    { field: 'subActivity', header: 'Subactividad', minWidth: '400px' },
    { field: 'budget', header: 'Presupuesto', minWidth: '200px' },
    { field: 'axis', header: 'Eje', minWidth: '200px' },
    { field: 'responsible', header: 'Responsable', minWidth: '200px' },
    { field: 'productNumber', header: 'Numero de producto', minWidth: '200px' },
    { field: 'product', header: 'Producto', minWidth: '700px' },
    { field: 'productDescription', header: 'Descripcion de producto', minWidth: '700px' },
    { field: 'deliveryDate', header: 'Fecha de entrega', minWidth: '200px' }
  ];

  activeObjectiveIndex = signal<number>(0);
  objectives = signal<GetOperationalPlanCiat[]>([]);
  currentActivities = signal<Actividad[]>([]);
  currentActivitiesWithRowspan = computed<TableActivity[]>(() => {
    const elements: TableActivity[] = [];
    this.currentActivities().forEach(activity => {
      if (activity.subactividades) {
        activity.subactividades.forEach((subactivity, index) => {
          if (subactivity.productos) {
            subactivity.productos.forEach((product, productIndex) => {
              elements.push({
                nombre_actv: index === 0 && productIndex === 0 ? activity.nombre_actv : '',
                rowspan: index === 0 && productIndex === 0 ? activity.rowspan : 0,
                nombre_subActv: productIndex === 0 ? subactivity.nombre_subActv : '',
                codigo_subActv: subactivity.codigo_subActv || '',
                budget: subactivity.presupuesto
                  ? '$ ' + subactivity.presupuesto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '',
                axis: product.ejes ? product.ejes.join(', ') : '',
                responsible: product.responsables ? product.responsables.join(', ') : '',
                productNumber: product.codigo ? product.codigo.toString() : '',
                product: product.nombre_prod || '',
                productDescription: product.descripcion || '',
                deliveryDate: product.fechaEntrega || ''
              });
            });
          }
        });
      }
    });
    return elements;
  });

  ngOnInit() {
    this.getPlanOperativoCiat();
  }

  setCurrentActivities = (index: number) => {
    this.currentActivities.set(this.objectives()[index]?.actividades || []);
    this.activeObjectiveIndex.set(index);
  };

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    console.log(response);
    this.objectives.set(response.data);
    this.currentActivities.set(this.objectives()[0].actividades);
    console.log(this.currentActivities());
  }
}
