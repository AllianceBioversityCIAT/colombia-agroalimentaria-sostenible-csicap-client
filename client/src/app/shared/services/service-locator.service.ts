import { Injectable, Injector } from '@angular/core';
import { ControlListServices } from '../interfaces/services.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocatorService {
  constructor(private injector: Injector) {}

  getService(serviceName: ControlListServices) {
    switch (serviceName) {
      // case 'contracts':
      //   return this.injector.get(GetContractsService);

      default:
        console.warn(`Service ${serviceName} not found`);
        return null;
    }
  }
}
