import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetProductos } from '../../interfaces/get/get-productos.interface';

@Injectable({
  providedIn: 'root'
})
export class GetProductosService {
  api = inject(ApiService);
  list = signal<GetProductos[]>([]);
  loading = signal(false);

  constructor() {
    this.getData();
  }

  getData = async () => {
    this.loading.set(true);
    const response = await this.api.getProductos();
    this.list.set(response.data);
    this.loading.set(false);
  };
}
