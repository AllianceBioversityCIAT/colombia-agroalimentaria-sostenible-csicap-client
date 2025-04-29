import { Injectable, WritableSignal, inject } from '@angular/core';
import { ToPromiseService } from './to-promise.service';
import { CacheService } from './cache/cache.service';
import { MainResponse, LoginRes } from '../interfaces/responses.interface';
import { GetOrganizations } from '../interfaces/get/get-organizations.interface';
import { GetUsers } from '../interfaces/get/get-users-interface';
import { GetOperationalPlanCiat } from '../interfaces/get/get-operational-plan-ciat.interface';
import { GetComponentsAndAxes } from '../interfaces/get/get-components-and-axes.interface';
import { GetBpinForm } from '../interfaces/get/get-bpin-form.interface';
import { GetOrganizationsDetail } from '../interfaces/get/get-organizations-detail.interface';
import {
  GetGCFComponentesIdsFilter,
  GetOrganizationsIdsFilter,
  GetRolesFilter
} from '../interfaces/get/get-users-filter.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { UserFormData } from '../../pages/platform/pages/user-management/components/user-form/user-form.component';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  TP = inject(ToPromiseService);
  cache = inject(CacheService);
  http = inject(HttpClient);

  //? >>>>>>>>>>>> Endpoints <<<<<<<<<<<<<<<<<
  login = (awsToken: string): Promise<MainResponse<LoginRes>> => {
    const url = () => `authorization/login`;
    return this.TP.post(url(), {}, { token: awsToken, useManagementApi: true });
  };

  refreshToken = (refreshToken: string): Promise<MainResponse<LoginRes>> => {
    const url = () => `authorization/refresh-token`;
    return this.TP.post(
      url(),
      {},
      { token: refreshToken, isRefreshToken: true, useManagementApi: true }
    );
  };

  getGCFComponentes = (): Promise<MainResponse<GetComponentsAndAxes[]>> => {
    const url = () => `gcf-componentes`;
    return this.TP.get(url(), {});
  };

  getFichaBpin = (): Promise<MainResponse<GetBpinForm[]>> => {
    const url = () => `bpin-objetivos/ficha-bpin`;
    return this.TP.get(url(), {});
  };

  getOrganizations = (): Promise<MainResponse<GetOrganizations[]>> => {
    const url = () => `organizations/nombres`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getOrganizationDetails = (): Promise<MainResponse<GetOrganizationsDetail[]>> => {
    const url = () => `organizations/detalle`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getUsers = ({
    eje,
    rol,
    organizacion
  }: {
    eje?: string | number | null;
    rol?: string | number | null;
    organizacion?: string | number | null;
  }): Promise<MainResponse<GetUsers[]>> => {
    const params = new URLSearchParams();

    if (eje) params.append('eje', String(eje));
    if (rol) params.append('rol', String(rol));
    if (organizacion) params.append('organizacion', String(organizacion));

    const query = params.toString();
    const url = () => `users/list${query ? `?${query}` : ''}`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  createUser = (user: UserFormData): Promise<MainResponse<UserFormData>> => {
    const url = () => `users/create`;
    return this.TP.post(url(), user, { useManagementApi: true });
  };

  //? >>>>>>>>>>>> Filters <<<<<<<<<<<<<<<<<
  getRoles = (): Promise<MainResponse<GetRolesFilter[]>> => {
    const url = () => `roles/roles_id`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getOrganizationsIds = (): Promise<MainResponse<GetOrganizationsIdsFilter[]>> => {
    const url = () => `organizations/id`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getOrganizationsByIsCgiar = (
    isCgiar: boolean
  ): Promise<MainResponse<GetOrganizationsIdsFilter[]>> => {
    const url = () => `organizations/filtro_org?isCgiar=${isCgiar}`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getRolesByOrganization = (
    organizationId: number
  ): Promise<MainResponse<GetGCFComponentesIdsFilter[]>> => {
    const url = () => `roles/filtro_rol?orgId=${organizationId}`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getEjeByRole = (roleId: number): Promise<MainResponse<GetGCFComponentesIdsFilter[]>> => {
    const url = () => `gcf-ejes/filtro_eje?roleIds=${roleId}`;
    return this.TP.get(url(), { useManagementApi: false });
  };

  getGCFComponentesIds = (): Promise<MainResponse<GetGCFComponentesIdsFilter[]>> => {
    const url = () => `gcf-ejes/ejes_id`;

    return this.TP.get(url(), {});
  };

  //? >>>>>>>>>>>> end Filters <<<<<<<<<<<<<<<<<

  getPlanOperativoCiat = (): Promise<MainResponse<GetOperationalPlanCiat[]>> => {
    const url = () => `bpin-objetivos/plan-operativo-ciat`;
    return this.TP.get(url(), {});
  };

  downloadPlanOperativoCiatExcel = (): void => {
    const url = `${environment.mainApiUrl}bpin-objetivos/excel-plan-operativo-ciat`;
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const downloadUrl = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'plan-operativo-ciat.xlsx';
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
    });
  };

  // GET_IndicatorTypes = (): Promise<MainResponse<IndicatorTypes[]>> => {
  //   const url = () => `indicator-types`;
  //   return this.TP.get(url(), {});
  // };

  // GET_AllIndicators = (): Promise<MainResponse<GetAllIndicators[]>> => {
  //   const url = () => `indicators`;
  //   return this.TP.get(url(), {});
  // };

  // GET_Contracts = (): Promise<MainResponse<GetContracts[]>> => {
  //   const url = () => `agresso/contracts`;
  //   return this.TP.get(url(), {});
  // };

  //? >>>>>>>>>>>> Utils <<<<<<<<<<<<<<<<<

  cleanBody(body: Record<string, unknown>) {
    for (const key in body) {
      if (typeof body[key] === 'string') {
        body[key] = '';
      } else if (typeof body[key] === 'number') {
        body[key] = null;
      } else if (Array.isArray(body[key])) {
        body[key] = [];
      } else {
        body[key] = null;
      }
    }
  }

  updateSignalBody(
    body: WritableSignal<Record<string, unknown>>,
    newBody: Record<string, unknown>
  ) {
    for (const key in newBody) {
      if (newBody[key] !== null) {
        body.update(prev => ({ ...prev, [key]: newBody[key] }));
      }
    }
  }
}
