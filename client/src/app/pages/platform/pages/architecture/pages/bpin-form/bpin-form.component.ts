import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../../../../../shared/services/api.service';
import { TableFichaBpinComponent } from '../../../../../../shared/components/custom-fields/table-ficha-bpin/table-ficha-bpin.component';
import { TabsModule } from 'primeng/tabs';
import { GetBpinForm } from '../../../../../../shared/interfaces/get/get-bpin-form.interface';
@Component({
  selector: 'app-bpin-form',
  standalone: true,
  imports: [SectionHeaderComponent, TableModule, TableFichaBpinComponent, TabsModule],
  templateUrl: './bpin-form.component.html',
  styleUrls: []
})
export default class BpinFormComponent implements OnInit {
  api = inject(ApiService);
  activeIndex = 0;
  fichaBpinData = signal<GetBpinForm[]>([]);

  tableColumns = [
    { field: 'activityCode', header: 'Codigo Actividad' },
    { field: 'activity', header: 'Actividad' },
    { field: 'subActivityCode', header: 'Codigo de subactividad' },
    { field: 'subActivity', header: 'Subactividad' }
  ];

  currentObjective = signal<GetBpinForm | null>(null);

  ngOnInit() {
    this.getFichaBpin();
  }

  setCurrentObjective(index: number) {
    this.currentObjective.set(this.fichaBpinData()[index]);
    console.log(this.currentObjective());
  }

  async getFichaBpin() {
    const res = await this.api.getFichaBpin();
    console.log(res);
    this.fichaBpinData.set(res.data);
    if (res.data.length > 0) {
      this.currentObjective.set(res.data[0]);
      this.activeIndex = 0;
    }
  }
}
