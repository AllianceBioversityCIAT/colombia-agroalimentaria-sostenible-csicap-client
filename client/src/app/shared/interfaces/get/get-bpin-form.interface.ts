export interface GetBpinForm {
  is_active: boolean;
  id: number;
  nombre: string;
  bpinActividades: BpinActividade[];
}

interface BpinActividade {
  is_active: boolean;
  id: number;
  codigo: string;
  nombre: string;
  BPIN_objetivos_codigo: number;
  bpinSubActividades: BpinSubActividade[];
}

interface BpinSubActividade {
  is_active: boolean;
  id: number;
  codigo: string;
  periodo: number;
  nombre: string;
  presupuesto: number;
  BPIN_actividades_id: number;
}
