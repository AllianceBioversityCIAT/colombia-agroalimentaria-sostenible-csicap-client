import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ToPromiseService } from '../to-promise.service';
import { DataCache } from '../../interfaces/cache.interface';
import { GreenChecks } from '../../interfaces/get/get-green-checks.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  TP = inject(ToPromiseService);

  isLoggedIn = signal(false);
  isValidatingToken = signal(false);
  dataCache: WritableSignal<DataCache> = signal(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data') ?? '') : {});
  windowHeight = signal(window.innerHeight);
  greenChecks = signal<GreenChecks>({});
  currentResultIsLoading = signal(false);
  currentResultId: WritableSignal<number> = signal(0);
}
