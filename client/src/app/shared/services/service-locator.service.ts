import { Injectable, Injector } from '@angular/core';
import { ControlListServices } from '../interfaces/services.interface';
import { GetOrganizationsIdsService } from './control-list/get-organizationsIds.service';
import { GetOrganizationsIsCgiarService } from './control-list/get-organizationsisCgiar.service';
import { GetRolesByOrganizationService } from './control-list/get-organizationsbyOrg.service';
import { GetEjeByRoleService } from './control-list/get-ejebyRoles.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceLocatorService {
  constructor(private injector: Injector) {}

  getService(serviceName: ControlListServices) {
    switch (serviceName) {
      case 'organizations':
        return this.injector.get(GetOrganizationsIdsService);
      case 'organizations_by_isCgiar':
        return this.injector.get(GetOrganizationsIsCgiarService);
      case 'roles_by_organization':
        return this.injector.get(GetRolesByOrganizationService);
      case 'eje_by_role':
        return this.injector.get(GetEjeByRoleService);

      default:
        console.warn(`Service ${serviceName} not found`);
        return null;
    }
  }
}
