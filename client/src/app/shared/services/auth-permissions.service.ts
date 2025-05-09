import { inject, Injectable, Signal, computed, signal } from '@angular/core';
import { CacheService } from './cache/cache.service';

/**
 * Tipos de permisos disponibles en la aplicación
 * Cada permiso representa una capacidad específica que puede tener un rol
 */
export type Permission = 'can_view_all_operational_plans' | 'can_view_upload_deliverable_button'; // Permiso para ver todos los planes operativos

/**
 * Interface que define la estructura de los permisos por rol
 */
export interface RolePermissions {
  id: number; // ID único del rol
  name: string; // Nombre descriptivo del rol
  permissions: Permission[]; // Lista de permisos asignados al rol
}

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionsService {
  cache = inject(CacheService);
  /**
   * Mapeo de roles y sus permisos correspondientes
   * Cada rol tiene una lista de permisos que determina sus capacidades
   */
  private readonly rolePermissionsMap: RolePermissions[] = [
    {
      id: 1,
      name: 'Administrador',
      permissions: ['can_view_all_operational_plans']
    },
    {
      id: 2,
      name: 'Observador',
      permissions: []
    },
    {
      id: 3,
      name: 'Punto focal',
      permissions: ['can_view_upload_deliverable_button']
    }
  ];

  // 1	Administrador
  // 2	Observador
  // 3	Punto focal
  // 4	Líder de eje CIAT
  // 5	Gestor de reportes
  // 6	Gestor GMU
  // 7	Gestor Plans
  // 8	Gestor de coordinación técnica
  // 9	Líder de coordinación técnica
  // 10	Líder de proyecto
  // 11	Usuario MADR

  /**
   * Signal que almacena el ID del rol actual del usuario
   * Se actualiza cuando el usuario inicia sesión o cambia de rol
   */
  private currentRoleId = signal<number | null>(null);

  /**
   * Signal computado que contiene los permisos del rol actual
   * Se actualiza automáticamente cuando cambia el currentRoleId
   */
  readonly currentPermissions: Signal<Permission[]> = computed(() => {
    const roleId = this.currentRoleId();
    if (!roleId) return [];
    return this.rolePermissionsMap.find(role => role.id === roleId)?.permissions || [];
  });

  /**
   * Establece el rol actual del usuario
   * @param roleId - ID del rol a establecer
   * @example
   * // En el servicio de autenticación después del login
   * this.authPermissions.setCurrentRole(userRoleId);
   */

  constructor() {
    this.setCurrentRole(this.cache.dataCache().user.rolesPersonas[0].rol_id);
  }

  setCurrentRole(roleId: number): void {
    this.currentRoleId.set(roleId);
  }

  /**
   * Verifica si el rol actual tiene un permiso específico
   * @param permission - Permiso a verificar
   * @returns boolean - true si tiene el permiso, false si no
   * @example
   * // En un componente
   * if (this.authPermissions.hasPermission('manage_users')) {
   *   // Mostrar opciones de administración de usuarios
   * }
   */
  hasPermission(permission: Permission): boolean {
    return this.currentPermissions().includes(permission);
  }

  /**
   * Verifica si el rol actual tiene al menos uno de los permisos especificados
   * @param permissions - Array de permisos a verificar
   * @returns boolean - true si tiene al menos uno de los permisos, false si no
   * @example
   * // En un guard de ruta
   * if (this.authPermissions.hasAnyPermission(['manage_users', 'view_reports'])) {
   *   // Permitir acceso
   * }
   */
  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Verifica si el rol actual tiene todos los permisos especificados
   * @param permissions - Array de permisos a verificar
   * @returns boolean - true si tiene todos los permisos, false si no
   * @example
   * // En un componente para funcionalidad avanzada
   * if (this.authPermissions.hasAllPermissions(['manage_users', 'manage_technical'])) {
   *   // Mostrar opciones avanzadas
   * }
   */
  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  /**
   * Obtiene la ruta inicial según el rol del usuario
   * @param roleId - ID del rol
   * @returns string - Ruta correspondiente al dashboard del rol
   * @example
   * // En el servicio de autenticación después del login
   * const homeRoute = this.authPermissions.getRoleHomeRoute(userRoleId);
   * this.router.navigate([homeRoute]);
   */
  getRoleHomeRoute(roleId: number): string {
    const role = this.rolePermissionsMap.find(r => r.id === roleId);

    switch (role?.id) {
      case 1: // Administrador
        return '/admin/dashboard';
      case 2: // Observador
        return '/viewer/dashboard';
      case 3: // Punto focal
        return '/focal/dashboard';
      default:
        return '/unauthorized';
    }
  }

  isAdmin = computed(() => this.currentRoleId() === 1);
  isObservador = computed(() => this.currentRoleId() === 2);
  isPuntoFocal = computed(() => this.currentRoleId() === 3);
}
