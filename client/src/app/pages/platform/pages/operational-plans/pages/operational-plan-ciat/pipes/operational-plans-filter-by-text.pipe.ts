import { Pipe, type PipeTransform } from '@angular/core';
import { Actividad } from '../../../../../../../shared/interfaces/get/get-operational-plan-ciat.interface';

interface ActividadPipe extends Actividad {
  joinAll?: string;
}

@Pipe({
  name: 'appOperationalPlansFilterByText',
  standalone: true
})
export class OperationalPlansFilterByTextPipe implements PipeTransform {
  transform(value: Actividad[], searchText: string | null): Actividad[] {
    if (!searchText) {
      return value;
    }

    const activitiesWithJoinAll = value as ActividadPipe[];
    activitiesWithJoinAll.forEach(item => {
      item.joinAll = this.createDefaultString(item);
    });

    return activitiesWithJoinAll.filter(item => item.joinAll?.toUpperCase().includes(searchText.toUpperCase()));
  }

  private createDefaultString(item: Actividad): string {
    const subactividades = item.subactividades.map(subactividad => subactividad.nombre_subActv).join(' ');
    const productosNombreProd = item.subactividades
      .map(subactividad => subactividad.productos.map(producto => producto.nombre_prod).join(' '))
      .join(' ');
    const productosDescripcion = item.subactividades
      .map(subactividad => subactividad.productos.map(producto => producto.descripcion).join(' '))
      .join(' ');
    const productosEjes = item.subactividades.map(subactividad => subactividad.productos.map(producto => producto.ejes).join(' ')).join(' ');

    return `${item?.nombre_actv} ${subactividades} ${productosNombreProd} ${productosDescripcion} ${productosEjes}`;
  }
}
