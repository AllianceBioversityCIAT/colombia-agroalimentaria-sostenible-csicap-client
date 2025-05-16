import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetSubActividades } from '../../interfaces/get/get-sub-actividades.interface';

@Injectable({
  providedIn: 'root'
})
export class GetSubActividadesService {
  api = inject(ApiService);
  list = signal<GetSubActividades[]>([]);
  loading = signal(false);

  constructor() {
    this.getData();
  }

  getData = async () => {
    this.loading.set(true);
    const response = await this.api.getSubActividades();
    this.list.set(response.data);
    this.loading.set(false);
  };
}
