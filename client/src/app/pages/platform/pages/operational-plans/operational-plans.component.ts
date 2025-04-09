import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ApiService } from '../../../../shared/services/api.service';
import { GetOrganizations } from '../../../../shared/interfaces/get/get-organizations.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-operational-plans',
  imports: [SectionHeaderComponent, RouterLink],
  templateUrl: './operational-plans.component.html',
  styleUrl: './operational-plans.component.scss'
})
export default class OperationalPlansComponent implements OnInit {
  api = inject(ApiService);
  organizations = signal<GetOrganizations[]>([]);
  ngOnInit() {
    console.log('test');
    this.getOrganizations();
  }
  async getOrganizations() {
    const res = await this.api.getOrganizations();
    console.log(res.data);
    this.organizations.set(res.data);
  }
}
