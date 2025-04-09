import { Injectable, WritableSignal, inject } from '@angular/core';
import { ToPromiseService } from './to-promise.service';
import { CacheService } from './cache/cache.service';
import { MainResponse, LoginRes } from '../interfaces/responses.interface';
import { GetOrganizations } from '../interfaces/get/get-organizations.interface';
import { GetUsers } from '../interfaces/get/get-users-interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  TP = inject(ToPromiseService);
  cache = inject(CacheService);
  //? >>>>>>>>>>>> Endpoints <<<<<<<<<<<<<<<<<
  login = (awsToken: string): Promise<MainResponse<LoginRes>> => {
    const url = () => `authorization/login`;
    return this.TP.post(url(), {}, { token: awsToken, useManagementApi: true });
  };

  refreshToken = (refreshToken: string): Promise<MainResponse<LoginRes>> => {
    const url = () => `authorization/refresh-token`;
    return this.TP.post(url(), {}, { token: refreshToken, isRefreshToken: true, useManagementApi: true });
  };

  getGCFComponentes = (): Promise<MainResponse<any[]>> => {
    const url = () => `gcf-componentes`;
    return this.TP.get(url(), {});
  };

  getFichaBpin = (): Promise<MainResponse<any[]>> => {
    const url = () => `bpin-objetivos/ficha-bpin`;
    return this.TP.get(url(), {});
  };

  getOrganizations = (): Promise<MainResponse<GetOrganizations[]>> => {
    const url = () => `organizations/nombres`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getOrganizationDetails = (): Promise<MainResponse<any[]>> => {
    const url = () => `organizations/detalle`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getUsers = (): Promise<MainResponse<GetUsers[]>> => {
    const url = () => `users/list`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  //? >>>>>>>>>>>> Filters <<<<<<<<<<<<<<<<<
  getRoles = (): Promise<MainResponse<any[]>> => {
    const url = () => `roles/roles_id`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getOrganizationsIds = (): Promise<MainResponse<any[]>> => {
    const url = () => `organizations/id`;
    return this.TP.get(url(), { useManagementApi: true });
  };

  getGCFComponentesIds = ({ eje, rol, organizacion }: { eje?: string; rol?: string; organizacion?: string }): Promise<MainResponse<any[]>> => {
    const params = new URLSearchParams();

    if (eje) params.append('eje', eje);
    if (rol) params.append('rol', rol);
    if (organizacion) params.append('organizacion', organizacion);

    const query = params.toString();
    const url = () => `gcf-ejes/ejes_id${query ? `?${query}` : ''}`;

    return this.TP.get(url(), {});
  };

  //? >>>>>>>>>>>> end Filters <<<<<<<<<<<<<<<<<

  getPlanOperativoCiat = (): Promise<MainResponse<any[]>> => {
    const url = () => `bpin-objetivos/plan-operativo-ciat`;
    return this.TP.get(url(), {});
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

  updateSignalBody(body: WritableSignal<Record<string, unknown>>, newBody: Record<string, unknown>) {
    for (const key in newBody) {
      if (newBody[key] !== null) {
        body.update(prev => ({ ...prev, [key]: newBody[key] }));
      }
    }
  }
}
