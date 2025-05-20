export interface Tabs {
  title: string;
  value: number;
  activities: Activity[];
}

export interface Activity {
  id: number;
  nombre_actv: string;
  subactividades: Subactivity[];
}

export interface Subactivity {
  id: number;
  nombre_subActv: string;
  presupuesto: number | string;
  productos: Product[];
}

export interface Product {
  id: number;
  codigo: string;
  nombre_prod: string;
  descripcion: string;
  ejes: string[];
  responsables: string[];
  fechaEntrega: string;
}

export interface TableColumn {
  field: string;
  header: string;
  minWidth?: string;
  hide?: boolean;
  hideWhenNotCiat?: boolean;
}

export interface FilterOptions {
  activity: number | null;
  subactivity: number | null;
  eje: number | null;
  producto: number | null;
}
