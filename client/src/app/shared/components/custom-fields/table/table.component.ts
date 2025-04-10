import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
interface ComponenteTabla {
  component: string;
  componentDescription: string;
  axis: string;
  axisDescription: string;
  rowspan: number;
}

export interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: ComponenteTabla[] = [];
}
