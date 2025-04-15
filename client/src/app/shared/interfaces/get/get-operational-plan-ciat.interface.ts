export interface GetOperationalPlanCiat {
  id_obj: number;
  nombre_obj: string;
  actividades: Actividad[];
}

export interface Actividad {
  codigo_actv: string;
  nombre_actv: string;
  rowspan: number;
  subactividades: Subactividade[];
}

interface Subactividade {
  codigo_subActv: string;
  nombre_subActv: string;
  presupuesto: number;
  rowspan: number;
  productos: Producto[];
}

interface Producto {
  codigo: number;
  nombre_prod: string;
  descripcion: string;
  fechaEntrega: string;
  ejes: string[];
  responsables: string[];
  rowSpan: number;
}
