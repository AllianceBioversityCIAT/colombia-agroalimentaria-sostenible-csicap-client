import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ApiService } from '../../../../shared/services/api.service';
import { GetOrganizations } from '../../../../shared/interfaces/get/get-organizations.interface';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-operational-plans',
  imports: [SectionHeaderComponent, RouterLink, FormsModule, InputTextModule],
  templateUrl: './operational-plans.component.html',
  styleUrl: './operational-plans.component.scss'
})
export default class OperationalPlansComponent implements OnInit, OnDestroy {
  api = inject(ApiService);
  organizations = signal<GetOrganizations[]>([]);
  filteredOrganizations = signal<GetOrganizations[]>([]);
  body = signal({ searchText: '' });

  ngOnInit() {
    this.getOrganizations();
  }

  async getOrganizations() {
    const res = await this.api.getOrganizations();
    this.organizations.set(res.data);
    this.filteredOrganizations.set(res.data);
  }

  searchOrganizations() {
    this.filteredOrganizations.set(
      this.organizations().filter(org => org.org_nombre_corto.toLowerCase().includes(this.body().searchText.toLowerCase()))
    );
  }

  ngOnDestroy() {
    this.filteredOrganizations.set([]);
    this.body.set({ searchText: '' });
  }
}
