import { GetOperationalPlanCiat } from './get-operational-plan-ciat.interface';

export interface GetPlanOperativoSocio {
  objetivos: Objetivo[];
  planOperativo: GetOperationalPlanCiat[];
}

export interface Objetivo {
  id: number;
  nombre: string;
}
