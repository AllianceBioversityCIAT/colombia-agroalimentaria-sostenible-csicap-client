import { Injectable } from '@angular/core';
import { Activity, Subactivity } from '../interfaces/operational-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  calculateTotalRows(activity: Activity): number {
    if (!activity?.subactividades) return 0;

    return activity.subactividades
      .filter((subactivity: Subactivity) => subactivity?.productos?.length > 0)
      .reduce((sum: number, subactivity: Subactivity) => {
        return sum + (subactivity?.productos?.length || 1);
      }, 0);
  }

  formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';
    return '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  formatArrayWithConjunction(array: string[]): string {
    if (!array || array.length === 0) return '';
    if (array.length === 1) return array[0];
    return array.slice(0, -1).join(', ') + ' y ' + array[array.length - 1];
  }
}
