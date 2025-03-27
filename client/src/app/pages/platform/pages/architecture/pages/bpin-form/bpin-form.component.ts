import { Component, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

interface Tabs {
  title: string;
  value: number;
  content: string;
}

@Component({
  selector: 'app-bpin-form',
  standalone: true,
  imports: [SectionHeaderComponent, TabViewModule, TableModule],
  templateUrl: './bpin-form.component.html',
  styleUrls: []
})
export default class BpinFormComponent implements OnInit {
  tabs: Tabs[] = [];
  activeIndex = 0;

  ngOnInit() {
    this.tabs = [
      { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
      { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
      { title: 'Tab 3', value: 2, content: 'Tab 3 Content' }
    ];
  }
}
