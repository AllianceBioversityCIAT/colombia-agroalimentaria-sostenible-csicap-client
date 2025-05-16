import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetActividades } from '../../interfaces/get/get-actividades.interface';

@Injectable({
  providedIn: 'root'
})
export class GetActividadesService {
  api = inject(ApiService);
  list = signal<GetActividades[]>([]);
  loading = signal(false);

  constructor() {
    this.getData();
  }

  getData = async () => {
    this.loading.set(true);
    const response = await this.api.getActividades();
    this.list.set(response.data);
    this.loading.set(false);
  };
}
