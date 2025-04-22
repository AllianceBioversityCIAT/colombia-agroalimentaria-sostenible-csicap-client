import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { DataCache } from '../../interfaces/cache.interface';
import { GreenChecks } from '../../interfaces/get/get-green-checks.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  isLoggedIn = signal(false);
  isValidatingToken = signal(false);
  dataCache: WritableSignal<DataCache> = signal(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data') ?? '') : {});
  windowHeight = signal(window.innerHeight);
  windowWidth = signal(window.innerWidth);
  greenChecks = signal<GreenChecks>({});
  currentResultIsLoading = signal(false);
  currentResultId: WritableSignal<number> = signal(0);
  hasSmallScreen = computed(() => this.windowHeight() < 768);
  hasSmallScreenWidth = computed(() => this.windowWidth() < 1280);
  isSidebarCollapsed = signal<boolean>(localStorage.getItem('isSidebarCollapsed') === 'true');

  toggleSidebar() {
    this.isSidebarCollapsed.update(isCollapsed => !isCollapsed);
    localStorage.setItem('isSidebarCollapsed', this.isSidebarCollapsed().toString());
  }
}
