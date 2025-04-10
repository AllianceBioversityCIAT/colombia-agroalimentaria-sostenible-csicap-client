export interface GetComponentsAndAxes {
  is_active: boolean;
  id: number;
  nombre: string;
  descripcion: string;
  gcfEjes: GcfEje[];
  test: string;
}

interface GcfEje {
  is_active: boolean;
  id: number;
  nombre: string;
  descripcion: string;
  GCF_componentes_codigo: number;
  rowspan?: number;
}
