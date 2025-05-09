import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthPermissionsService, Permission } from '../services/auth-permissions.service';

export const permissionGuard = (requiredPermissions: Permission[]): CanActivateFn => {
  return () => {
    const authPermissions = inject(AuthPermissionsService);
    const router = inject(Router);

    if (authPermissions.hasAnyPermission(requiredPermissions)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
};
