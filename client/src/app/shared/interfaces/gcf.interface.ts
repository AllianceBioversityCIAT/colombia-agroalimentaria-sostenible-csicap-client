export interface GCFEje {
  nombre: string;
  descripcion: string;
}

export interface GCFComponente {
  nombre: string;
  descripcion: string;
  gcfEjes: GCFEje[];
}
