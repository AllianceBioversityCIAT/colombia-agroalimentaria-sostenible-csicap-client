import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { GetActividades } from '../../../../../../../shared/interfaces/get/get-actividades.interface';
import { GetSubActividades } from '../../../../../../../shared/interfaces/get/get-sub-actividades.interface';
import { GetProductos } from '../../../../../../../shared/interfaces/get/get-productos.interface';
import { GetGCFComponentesIdsFilter } from '../../../../../../../shared/interfaces/get/get-users-filter.interface';
import { SelectChangeEvent } from 'primeng/select';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private readonly api = inject(ApiService);

  activityOptions = signal<GetActividades[]>([]);
  subactivityOptions = signal<GetSubActividades[]>([]);
  ejeOptions = signal<GetGCFComponentesIdsFilter[]>([]);
  productoOptions = signal<GetProductos[]>([]);

  selectedActivity = signal<number | null>(null);
  selectedSubactivity = signal<number | null>(null);
  selectedEje = signal<number | null>(null);
  selectedProducto = signal<number | null>(null);
  searchInput = signal<string | null>(null);

  hasFilters = computed(() => {
    return (
      this.selectedActivity() !== null ||
      this.selectedSubactivity() !== null ||
      this.selectedEje() !== null ||
      this.selectedProducto() !== null ||
      this.searchInput() !== null
    );
  });

  initialize() {
    this.loadAllFilterOptions();
  }

  loadAllFilterOptions() {
    this.getActivityOptions();
    this.getSubactivityOptions();
    this.getEjeOptions();
    this.getProductoOptions();
  }

  async getActivityOptions() {
    const actividadesBpin = await this.api.getActividades();
    this.activityOptions.set(actividadesBpin.data);
  }

  async getSubactivityOptions() {
    const subactividadesBpin = await this.api.getSubActividades();
    this.subactivityOptions.set(subactividadesBpin.data);
  }

  async getEjeOptions() {
    const gcfComponentesIds = await this.api.getGCFComponentesIds();
    this.ejeOptions.set(gcfComponentesIds.data);
  }

  async getProductoOptions() {
    const productosBpin = await this.api.getProductos();
    this.productoOptions.set(productosBpin.data);
  }

  onActivityChange(event: SelectChangeEvent) {
    this.selectedActivity.set(event.value);
    this.searchInput.set(null);
  }

  onSubactivityChange(event: SelectChangeEvent) {
    this.selectedSubactivity.set(event.value);
    this.searchInput.set(null);
  }

  onEjeChange(event: SelectChangeEvent) {
    this.selectedEje.set(event.value);
    this.searchInput.set(null);
  }

  onProductoChange(event: SelectChangeEvent) {
    this.selectedProducto.set(event.value);
    this.searchInput.set(null);
  }

  clearAllFilters() {
    this.selectedActivity.set(null);
    this.selectedSubactivity.set(null);
    this.selectedEje.set(null);
    this.selectedProducto.set(null);
    this.searchInput.set(null);
  }

  getAppliedFilters() {
    return {
      activity: this.selectedActivity(),
      subactivity: this.selectedSubactivity(),
      eje: this.selectedEje(),
      producto: this.selectedProducto()
    };
  }
}
