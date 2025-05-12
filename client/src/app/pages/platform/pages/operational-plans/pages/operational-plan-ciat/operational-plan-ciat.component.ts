import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { TableColumn } from '../../../../../../shared/components/custom-fields/table/table.component';
import { ApiService } from '../../../../../../shared/services/api.service';
import { Actividad, GetOperationalPlanCiat } from '../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CacheService } from '@shared/services/cache/cache.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

interface Tabs {
  title: string;
  value: number;
  activities: Activity[];
}

interface Activity {
  id: number;
  nombre_actv: string;
  subactividades: Subactivity[];
}

interface Subactivity {
  id: number;
  nombre_subActv: string;
  presupuesto: string;
  productos: Product[];
}

interface Product {
  id: number;
  codigo: string;
  nombre_prod: string;
  descripcion: string;
  ejes: string[];
  responsables: string[];
  fechaEntrega: string;
}

@Component({
  selector: 'app-operational-plan-ciat',
  imports: [SectionHeaderComponent, TabsModule, TableModule, DatePipe, ButtonModule, CommonModule, TooltipModule, RouterLink],
  templateUrl: './operational-plan-ciat.component.html',
  styleUrl: './operational-plan-ciat.component.scss'
})
export default class OperationalPlanCiatComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;
  api = inject(ApiService);
  cache = inject(CacheService);
  loadingDownload = signal<boolean>(false);

  columns: TableColumn[] = [
    { field: 'activity', header: 'Actividad', minWidth: '250px' },
    { field: 'subActivity', header: 'Subactividad', minWidth: '250px' },
    { field: 'budget', header: 'Presupuesto', minWidth: '150px' },
    { field: 'axis', header: 'Ejes', minWidth: '150px' },
    { field: 'responsible', header: 'Responsable', minWidth: '200px' },
    { field: 'productNumber', header: 'No. de Producto', minWidth: '115px' },
    { field: 'product', header: 'Producto', minWidth: '800px' },
    { field: 'productDescription', header: 'Descripcion de producto', minWidth: '800px' },
    { field: 'deliveryDate', header: 'Fecha de entrega', minWidth: '150px' }
  ];

  activeObjectiveIndex = signal<number>(0);
  objectives = signal<GetOperationalPlanCiat[]>([]);
  currentActivities = signal<Actividad[]>([]);

  ngOnInit() {
    this.getPlanOperativoCiat();
  }

  calculateTotalRows(activity: Activity): number {
    if (!activity || !activity.subactividades) return 0;

    return activity.subactividades
      .filter((subactivity: Subactivity) => subactivity?.productos?.length > 0)
      .reduce((sum: number, subactivity: Subactivity) => {
        return sum + (subactivity?.productos?.length || 1);
      }, 0);
  }

  formatCurrency(value: number | null | undefined): string {
    if (!value) return '';
    return '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  formatArrayWithConjunction(array: string[]): string {
    if (!array || array.length === 0) return '';
    if (array.length === 1) return array[0];
    return array.slice(0, -1).join(', ') + ' y ' + array[array.length - 1];
  }

  setCurrentActivities = (index: number) => {
    this.currentActivities.set(this.objectives()[index]?.actividades || []);
    this.activeObjectiveIndex.set(index);
  };

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    this.objectives.set(response.data);
    this.currentActivities.set(this.objectives()[0]?.actividades || []);
  }

  downloadExcel() {
    this.loadingDownload.set(true);
    this.api.downloadPlanOperativoCiatExcel();

    setTimeout(() => {
      this.loadingDownload.set(false);
    }, 2000);
  }
}
