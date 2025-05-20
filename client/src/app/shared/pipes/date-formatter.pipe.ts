import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }

    try {
      const date = value instanceof Date ? value : new Date(value);

      if (isNaN(date.getTime())) {
        return value.toString();
      }

      const weekDays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

      const day = date.getDate();
      const weekDay = weekDays[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `el ${weekDay} ${day} de ${month} ${year}`;
    } catch {
      return value.toString();
    }
  }
}
