import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { SectionHeaderComponent } from '../../../../../../shared/components/section-header/section-header.component';
import { DatePipe, CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CacheService } from '@shared/services/cache/cache.service';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Select, SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { FiltersService } from './services/filters.service';
import { OperationalPlanService } from './services/operational-plan.service';
import { UtilityService } from './services/utility.service';
import { TableColumn } from './interfaces/operational-plan.interface';

@Component({
  selector: 'app-operational-plan-ciat',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    TabsModule,
    TableModule,
    DatePipe,
    ButtonModule,
    CommonModule,
    TooltipModule,
    RouterLink,
    SelectModule,
    FormsModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule
  ],
  templateUrl: './operational-plan-ciat.component.html',
  styleUrl: './operational-plan-ciat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OperationalPlanCiatComponent implements OnInit {
  @ViewChild('operationalPlanTable') operationalPlanTable!: Table;
  @ViewChild('activityFilter') activityFilter!: Select;
  @ViewChild('subactivityFilter') subactivityFilter!: Select;
  @ViewChild('ejeFilter') ejeFilter!: Select;
  @ViewChild('productoFilter') productoFilter!: Select;

  filterService = inject(FiltersService);
  planService = inject(OperationalPlanService);
  utilityService = inject(UtilityService);
  cache = inject(CacheService);
  route = inject(ActivatedRoute);

  planId = signal<string | null>(null);

  columns: TableColumn[] = [
    { field: 'activity', header: 'Actividad', minWidth: '250px' },
    { field: 'subActivity', header: 'Subactividad', minWidth: '250px' },
    { field: 'budget', header: 'Presupuesto', minWidth: '150px', hideWhenNotCiat: true },
    { field: 'axis', header: 'Ejes', minWidth: '150px' },
    { field: 'responsible', header: 'Responsable', minWidth: '200px', hideWhenNotCiat: true },
    { field: 'productNumber', header: 'No. de Producto', minWidth: '115px', hideWhenNotCiat: true },
    { field: 'product', header: 'Producto', minWidth: '800px' },
    { field: 'productDescription', header: 'Descripcion de producto', minWidth: '800px' },
    { field: 'deliveryDate', header: 'Fecha de entrega', minWidth: '150px', hideWhenNotCiat: true }
  ];

  ngOnInit() {
    this.planId.set(this.route.snapshot.paramMap.get('id'));
    this.initialize();
  }

  async initialize() {
    await this.planService.getOperationalPlanData(this.planId());
  }

  setCurrentActivities(index: number) {
    this.planService.setActiveObjectiveIndex(index);

    if (!this.planService.isCiat()) {
      const objectiveId = this.planService.currentObjectives()[index]?.id;
      if (objectiveId) {
        this.planService.getDynamicOperationalPlan(objectiveId);
      }
    }
  }

  downloadExcel() {
    this.planService.downloadExcel();
  }

  onActivityChange(event: SelectChangeEvent) {
    this.filterService.onActivityChange(event);
    this.refreshData();
  }

  onSubactivityChange(event: SelectChangeEvent) {
    this.filterService.onSubactivityChange(event);
    this.refreshData();
  }

  onEjeChange(event: SelectChangeEvent) {
    this.filterService.onEjeChange(event);
    this.refreshData();
  }

  onProductoChange(event: SelectChangeEvent) {
    this.filterService.onProductoChange(event);
    this.refreshData();
  }

  clearFilters() {
    if (!this.filterService.hasFilters()) {
      return;
    }

    this.filterService.clearAllFilters();

    if (this.activityFilter) this.activityFilter.clear();
    if (this.subactivityFilter) this.subactivityFilter.clear();
    if (this.ejeFilter) this.ejeFilter.clear();
    if (this.productoFilter) this.productoFilter.clear();

    this.refreshData();
  }

  async refreshData() {
    await this.initialize();

    if (this.operationalPlanTable) {
      this.operationalPlanTable.reset();
    }
  }
}
