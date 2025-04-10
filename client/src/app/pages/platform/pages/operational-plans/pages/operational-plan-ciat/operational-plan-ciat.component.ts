import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { TableColumn } from '../../../../../../shared/components/custom-fields/table/table.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Actividad, GetOperationalPlanCiat } from '../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';
import { DatePipe } from '@angular/common';

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
  axis: string;
  responsible: string;
  productNumber: string;
  product: string;
  productDescription: string;
  deliveryDate: string;
}

@Component({
  selector: 'app-operational-plan-ciat',
  imports: [SectionHeaderComponent, TabsModule, TableModule, DatePipe],
  templateUrl: './operational-plan-ciat.component.html',
  styleUrl: './operational-plan-ciat.component.scss'
})
export default class OperationalPlanCiatComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;
  api = inject(ApiService);

  columns: TableColumn[] = [
    { field: 'activity', header: 'Actividad' },
    { field: 'subActivity', header: 'Subactividad' },
    { field: 'axis', header: 'Eje' },
    { field: 'responsible', header: 'Responsable' },
    { field: 'productNumber', header: 'Numero de producto' },
    { field: 'product', header: 'Producto' },
    { field: 'productDescription', header: 'Descripcion de producto' },
    { field: 'deliveryDate', header: 'Fecha de entrega' }
  ];

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
                codigo_subActv: subactivity.codigo_subActv,
                axis: product.ejes ? product.ejes.join(', ') : '',
                responsible: product.responsables ? product.responsables.join(', ') : '',
                productNumber: product.id_prod ? product.id_prod.toString() : '',
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

  setCurrentActivities = (index: number) => this.currentActivities.set(this.objectives()[index]?.actividades || []);

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    console.log(response);
    this.objectives.set(response.data);
    this.currentActivities.set(this.objectives()[0].actividades);
    console.log(this.currentActivities());
  }
}
