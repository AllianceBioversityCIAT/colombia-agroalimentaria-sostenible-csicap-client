import { inject, Injectable } from '@angular/core';
import { ToPromiseService } from '../to-promise.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  TP = inject(ToPromiseService);

  login = (awsToken: string): Promise<MainResponse<LoginRes>> => {
    const url = () => `authorization/login`;
    return this.TP.post(url(), {}, { token: awsToken, isAuth: true });
  };
}
