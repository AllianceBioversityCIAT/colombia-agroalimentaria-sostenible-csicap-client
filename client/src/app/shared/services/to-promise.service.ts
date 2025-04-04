import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, map, catchError, finalize } from 'rxjs';
import { MainResponse } from '../interfaces/responses.interface';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache/cache.service';
import { GreenChecks } from '../interfaces/get/get-green-checks.interface';
@Injectable({
  providedIn: 'root'
})
export class ToPromiseService {
  http = inject(HttpClient);
  cacheService = inject(CacheService);

  private TP = (subscription: Observable<any>, loadingTrigger?: boolean): Promise<MainResponse<any>> => {
    if (loadingTrigger) {
      this.cacheService.currentResultIsLoading.set(true);
      this.cacheService.greenChecks.set({});
    }

    return firstValueFrom(
      subscription.pipe(
        map(data => ({ ...data, successfulRequest: true })),
        catchError(error => {
          console.error(error);
          return [{ ...error, successfulRequest: false, errorDetail: error?.error }];
        }),
        finalize(() => {
          if (loadingTrigger) {
            this.cacheService.currentResultIsLoading.set(false);
            this.updateGreenChecks();
          }
        })
      )
    );
  };

  delete = <T>(url: string, config?: Config) => {
    return this.TP(this.http.delete<T>(this.getEnv(config?.useManagementApi) + url));
  };

  post = <T, B>(url: string, body: B, config?: Config) => {
    let headers = new HttpHeaders();
    if (config?.token) {
      headers = headers.set('Authorization', `Bearer ${config.token}`);
    }
    if (config?.isRefreshToken) {
      headers = headers.set('refresh-token', `${config.token}`);
    }
    return this.TP(this.http.post<T>(this.getEnv(config?.useManagementApi) + url, body, { headers }));
  };

  put = <T, B>(url: string, body: B, config?: Config) => {
    return this.TP(this.http.put<T>(this.getEnv(config?.useManagementApi) + url, body));
  };

  get = <T>(url: string, config?: Config) => {
    return this.TP(this.http.get<T>(this.getEnv(config?.useManagementApi) + url), config?.loadingTrigger);
  };

  patch = <T, B>(url: string, body: B, config?: Config) => {
    return this.TP(this.http.patch<T>(this.getEnv(config?.useManagementApi) + url, body));
  };

  getEnv = (useManagementApi: boolean | string | undefined) => {
    if (typeof useManagementApi === 'string') return useManagementApi;
    return useManagementApi ? environment.managementApiUrl : environment.mainApiUrl;
  };

  getGreenChecks = (): Promise<MainResponse<GreenChecks>> => {
    const url = () => `results/green-checks/${this.cacheService.currentResultId()}`;
    return this.get(url(), {});
  };

  async updateGreenChecks() {
    const response = await this.getGreenChecks();
    this.cacheService.greenChecks.set(response.data);
  }
}

interface Config {
  token?: string;
  useManagementApi?: boolean | string;
  isRefreshToken?: boolean;
  loadingTrigger?: boolean;
}
