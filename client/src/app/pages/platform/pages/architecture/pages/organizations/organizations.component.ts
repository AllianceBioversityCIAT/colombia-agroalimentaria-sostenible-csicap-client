import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-organizations',
  imports: [],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export default class OrganizationsComponent implements OnInit {
  api = inject(ApiService);

  ngOnInit() {
    this.getOrganizationDetails();
  }
  async getOrganizationDetails() {
    const response = await this.api.getOrganizationDetails();
    console.log(response);
  }
}
