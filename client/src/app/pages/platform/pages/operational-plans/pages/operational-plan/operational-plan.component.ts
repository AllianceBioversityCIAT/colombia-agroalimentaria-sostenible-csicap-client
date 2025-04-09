import { Component, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ApiService } from '../../../../../../shared/services/api.service';

interface Activity {
  activityCode: string;
  activity: string;
  subActivityCode: string;
  subActivity: string;
}

interface Tabs {
  title: string;
  value: number;
  activities: Activity[];
}

@Component({
  selector: 'app-operational-plan',
  imports: [SectionHeaderComponent, TabViewModule, TableModule],
  templateUrl: './operational-plan.component.html',
  styleUrl: './operational-plan.component.scss'
})
export default class OperationalPlanComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;
  api = inject(ApiService);
  ngOnInit() {
    this.getPlanOperativoCiat();
    this.tabs = [
      {
        title: 'Objetivo 1',
        value: 0,
        activities: []
      },
      {
        title: 'Objetivo 2',
        value: 0,
        activities: []
      },
      {
        title: 'Objetivo 3',
        value: 0,
        activities: []
      },
      {
        title: 'Objetivo 4',
        value: 0,
        activities: []
      }
    ];
  }

  async getPlanOperativoCiat() {
    const response = await this.api.getPlanOperativoCiat();
    console.log(response);
  }
}
