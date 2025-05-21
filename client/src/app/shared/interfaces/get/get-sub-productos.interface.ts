export interface GetSubProductos {
  subproductos: Subproducto[];
  hitosxsubproducto: Hitosxsubproducto[];
}

export interface Hitosxsubproducto {
  id_producto: number;
  nombre_producto: string;
  ejes: string[];
  subproductos: Subproducto2[];
}

export interface Subproducto2 {
  id_subproducto: number;
  nombre_subproducto: string;
  que_se_hara: string;
  metodologia: string;
  como_se_reportara: string;
  lugares: Lugare[];
  hitos: Hito[];
}

export interface Hito {
  id_hito: number;
  hito_index: number;
  nombre_hito: string;
  porcentaje: string;
  fecha_esperada: string;
  entregables: Entregable[];
}

interface Entregable {
  id: number;
  entregable_index: number;
  nombre: string;
  descripcion: string;
}

interface Lugare {
  id_lugar: number;
  nombre: string;
}

export interface Subproducto {
  sp_id: number;
  sp_nombre: string;
  subproducto_index: string;
}
