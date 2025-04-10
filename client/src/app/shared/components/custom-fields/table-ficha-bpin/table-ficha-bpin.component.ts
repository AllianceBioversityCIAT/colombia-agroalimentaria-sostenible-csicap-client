import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GetBpinForm } from '../../../interfaces/get/get-bpin-form.interface';

interface Activity {
  activityCode: string;
  activity: string;
  subActivityCode: string;
  subActivity: string;
}

@Component({
  selector: 'app-table-ficha-bpin',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table-ficha-bpin.component.html'
})
export class TableFichaBpinComponent {
  @Input() currentObjective: WritableSignal<GetBpinForm | null> = signal(null);

  tableColumns = [
    { field: 'activityCode', header: 'Codigo Actividad' },
    { field: 'activity', header: 'Actividad' },
    { field: 'subActivityCode', header: 'Codigo de subactividad' },
    { field: 'subActivity', header: 'Subactividad' }
  ];

  getRowspan(activityCode: string, currentIndex: number, activities: Activity[]): number {
    if (!activityCode) return 0;

    let rowspan = 1;
    for (let i = currentIndex + 1; i < activities.length; i++) {
      if (!activities[i].activityCode) {
        rowspan++;
      } else {
        break;
      }
    }
    return rowspan;
  }
}
