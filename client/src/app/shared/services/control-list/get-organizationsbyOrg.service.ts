import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetGCFComponentesIdsFilter } from '../../interfaces/get/get-users-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class GetRolesByOrganizationService {
  api = inject(ApiService);
  list = signal<GetGCFComponentesIdsFilter[]>([]);
  loading = signal(true);
  isOpenSearch = signal(false);

  getInstance = async (endpointParams: { organization_id: number }): Promise<WritableSignal<GetGCFComponentesIdsFilter[]>> => {
    const newSignal = signal<GetGCFComponentesIdsFilter[]>([]);
    const response = await this.api.getRolesByOrganization(endpointParams.organization_id);

    newSignal.set(response.data);

    return newSignal;
  };
}
