import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { TableColumn } from '../../../../../../shared/components/custom-fields/table/table.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Actividad, GetOperationalPlanCiat } from '../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';

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
@Component({
  selector: 'app-operational-plan-ciat',
  imports: [SectionHeaderComponent, TabsModule, TableModule],
  templateUrl: './operational-plan-ciat.component.html',
  styleUrl: './operational-plan-ciat.component.scss'
})
export default class OperationalPlanCiatComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;
  api = inject(ApiService);

  columns: TableColumn[] = [
    { field: 'activity', header: 'Actividad' },
    { field: 'subActivity', header: 'Subactividad' }
    // { field: 'axis', header: 'Eje' },
    // { field: 'responsible', header: 'Responsable' },
    // { field: 'productNumber', header: 'Numero de producto' },
    // { field: 'product', header: 'Producto' },
    // { field: 'productDescription', header: 'Descripcion de producto' },
    // { field: 'deliveryDate', header: 'Fecha de entrega' }
  ];

  objectives = signal<GetOperationalPlanCiat[]>([]);
  currentActivities = signal<Actividad[]>([]);
  currentActivitiesWithRowspan = computed(() => {
    const elements: any = [];
    this.currentActivities().forEach(activity => {
      for (let index = 0; index < activity.rowspan; index++) {
        if (index === 0) elements.push({ ...activity, subActivity: activity.subactividades[index] });
        else elements.push({ subActivity: activity.subactividades[index] });
      }
    });
    console.log(this.currentActivities());
    console.log(elements);
    return elements;
  });

  ngOnInit() {
    this.getPlanOperativoCiat();
  }

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    console.log(response);
    this.objectives.set(response.data);
    this.currentActivities.set(this.objectives()[0].actividades);
    console.log(this.currentActivities());
  }
}
