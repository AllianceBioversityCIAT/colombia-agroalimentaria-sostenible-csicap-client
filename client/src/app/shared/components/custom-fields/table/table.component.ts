/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

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
export class TableComponent<T extends Record<string, any>> {
  @Input() columns: TableColumn[] = [];
  @Input() data = signal<T[]>([]);
  @Input() subListAttribute = 'gcfEjes';

  mappedData = computed(() => {
    console.log(this.data());
    const result: any[] = [];
    this.data().forEach((item: any) => {
      if (item[this.subListAttribute].length) {
        item[this.subListAttribute][0].rowspan = item[this.subListAttribute].length;
        item.test = 'test';
      }
      result.push(
        ...item[this.subListAttribute].map((subItem: any) => {
          // console.log(subItem);
          // console.log(Object.keys(subItem));
          const rr: any = {};
          Object.keys(subItem).map(key => {
            rr[this.subListAttribute + key] = subItem[key];
          });
          // console.log(rr);
          return rr;
        })
      );
    });
    console.log(result);
    return result;
  });
}
