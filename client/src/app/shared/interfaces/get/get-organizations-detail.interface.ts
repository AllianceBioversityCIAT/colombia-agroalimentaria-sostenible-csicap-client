export interface GetOrganizationsDetail {
  is_active: boolean;
  id: number;
  nombre_corto: string;
  nombre: string;
  tipo_organizacion: string;
  proposito: string;
  sistemas_productivos: string;
  sitio_web: string;
  email: string;
  numero_telefono: string;
  direccion: string;
  logo: string;
  organizacionesContactos: OrganizacionesContacto[];
}

interface OrganizacionesContacto {
  is_active: boolean;
  id: number;
  organizacion: number;
  nombre_contacto: string;
  rol: string;
  email_contacto: string;
}
