import { Injectable, WritableSignal, inject } from '@angular/core';
import { ToPromiseService } from './to-promise.service';
import { CacheService } from './cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  TP = inject(ToPromiseService);
  cache = inject(CacheService);
  //? >>>>>>>>>>>> Endpoints <<<<<<<<<<<<<<<<<
  // login = (awsToken: string): Promise<MainResponse<LoginRes>> => {
  //   const url = () => `authorization/login`;
  //   return this.TP.post(url(), {}, { token: awsToken, isAuth: true });
  // };

  // refreshToken = (refreshToken: string): Promise<MainResponse<LoginRes>> => {
  //   const url = () => `authorization/refresh-token`;
  //   return this.TP.post(url(), {}, { token: refreshToken, isRefreshToken: true, isAuth: true });
  // };

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
