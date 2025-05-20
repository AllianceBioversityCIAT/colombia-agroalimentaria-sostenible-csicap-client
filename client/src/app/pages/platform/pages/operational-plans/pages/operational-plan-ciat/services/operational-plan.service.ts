import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { Actividad, GetOperationalPlanCiat } from '../../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';
import { Objetivo } from '../../../../../../../shared/interfaces/get/get-plan-pperativo-socio.interface';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root'
})
export class OperationalPlanService {
  private readonly api = inject(ApiService);
  private readonly filtersService = inject(FiltersService);

  objectives = signal<GetOperationalPlanCiat[]>([]);
  currentActivities = signal<Actividad[]>([]);
  currentObjectives = signal<Objetivo[]>([]);
  activeObjectiveIndex = signal<number>(0);
  isCiat = signal<boolean>(false);
  loadingDownload = signal<boolean>(false);

  setPlanType(isCiat: boolean) {
    this.isCiat.set(isCiat);
  }

  setActiveObjectiveIndex(index: number) {
    this.activeObjectiveIndex.set(index);
    this.updateCurrentActivities();
  }

  updateCurrentActivities() {
    this.currentActivities.set(this.objectives()[this.activeObjectiveIndex()]?.actividades || []);
  }

  async getOperationalPlanData(id: string | null, objectiveId = 1) {
    const isCiatPlan = id === 'ciat';
    this.setPlanType(isCiatPlan);

    if (isCiatPlan) {
      await this.getPlanOperativoCiat();
    } else {
      await this.getDynamicOperationalPlan(objectiveId);
      this.filtersService.initialize();
    }
  }

  async getDynamicOperationalPlan(objectiveId: number) {
    const filters = this.filtersService.getAppliedFilters();

    const response = await this.api.getPlanOperativoSocio(objectiveId, filters.activity, filters.subactivity, filters.eje, filters.producto);

    if (!response.data) {
      this.objectives.set([]);
      this.currentObjectives.set([]);
      this.currentActivities.set([]);
      return;
    }

    this.objectives.set(response.data.planOperativo);
    this.currentObjectives.set(response.data.objetivos);
    this.updateCurrentActivities();
  }

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    this.objectives.set(response.data);
    this.updateCurrentActivities();
  }

  downloadExcel() {
    this.loadingDownload.set(true);
    try {
      this.api.downloadPlanOperativoCiatExcel();
    } finally {
      setTimeout(() => {
        this.loadingDownload.set(false);
      }, 2000);
    }
  }
}
