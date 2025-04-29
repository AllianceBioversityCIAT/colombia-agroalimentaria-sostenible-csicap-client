import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetOrganizationsIdsFilter } from '../../interfaces/get/get-users-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class GetOrganizationsIsCgiarService {
  api = inject(ApiService);
  list = signal<GetOrganizationsIdsFilter[]>([]);
  loading = signal(true);
  isOpenSearch = signal(false);

  getInstance = async (endpointParams: { is_cgiar: boolean }): Promise<WritableSignal<GetOrganizationsIdsFilter[]>> => {
    const newSignal = signal<GetOrganizationsIdsFilter[]>([]);
    const response = await this.api.getOrganizationsByIsCgiar(endpointParams.is_cgiar);

    newSignal.set(response.data);

    return newSignal;
  };
}
