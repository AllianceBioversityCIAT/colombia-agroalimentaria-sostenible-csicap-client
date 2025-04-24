import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetOrganizationsIdsFilter } from '../../interfaces/get/get-users-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class GetOrganizationsIdsService {
  api = inject(ApiService);
  list = signal<GetOrganizationsIdsFilter[]>([]);
  loading = signal(true);
  isOpenSearch = signal(false);
  constructor() {
    this.initialize();
  }

  initialize() {
    this.main();
  }

  async main() {
    this.loading.set(true);
    const response = await this.api.getOrganizationsIds();

    if (response?.data) {
      this.list.set(response.data);
    } else {
      this.list.set([]);
    }

    this.loading.set(false);
  }
}
