import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api.service';
import { GetGCFComponentesIdsFilter } from '../../interfaces/get/get-users-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class GetEjeByRoleService {
  api = inject(ApiService);
  list = signal<GetGCFComponentesIdsFilter[]>([]);
  loading = signal(true);
  isOpenSearch = signal(false);

  getInstance = async (endpointParams: {
    roleId: number;
  }): Promise<WritableSignal<GetGCFComponentesIdsFilter[]>> => {
    const newSignal = signal<GetGCFComponentesIdsFilter[]>([]);
    const response = await this.api.getEjeByRole(endpointParams.roleId);

    newSignal.set(response.data);

    return newSignal;
  };
}
