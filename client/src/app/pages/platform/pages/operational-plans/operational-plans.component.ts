import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ApiService } from '../../../../shared/services/api.service';

interface Organization {
  name: string;
  logoUrl: string;
}

@Component({
  selector: 'app-operational-plans',
  imports: [SectionHeaderComponent],
  templateUrl: './operational-plans.component.html',
  styleUrl: './operational-plans.component.scss'
})
export default class OperationalPlansComponent implements OnInit {
  api = inject(ApiService);
  organizations = signal<Organization[]>([
    { name: 'Alianza Bioversity & CIAT', logoUrl: '/organizations/Logo Alianza CGIAR.png' },
    { name: 'Agrosavia', logoUrl: '/organizations/Logo Agrosavia.png' },
    { name: 'Asbama', logoUrl: '/organizations/Logo Asbama.png' },
    { name: 'Asohofrucol', logoUrl: '/organizations/Logo Asohofrucol.png' },
    { name: 'Augura', logoUrl: '/organizations/Logo Augura.png' },
    { name: 'Cenicafe', logoUrl: '/organizations/Logo Cenicafe.png' },
    { name: 'Cenicaña', logoUrl: '/organizations/Logo Cenicana.png' },
    { name: 'CIMMYT', logoUrl: '/organizations/Logo CIMMYT.png' },
    { name: 'CIPAV', logoUrl: '/organizations/Logo CIPAV.gif' },
    { name: 'Fedearroz', logoUrl: '/organizations/Logo Fedearroz.png' },
    { name: 'Fedegan', logoUrl: '/organizations/Logo Fedegan.png' },
    { name: 'Fedepanela', logoUrl: '/organizations/Logo Fedepanela.png' },
    { name: 'Fedepapa', logoUrl: '/organizations/Logo Fedepapa.png' },
    { name: 'Fenalce', logoUrl: '/organizations/Logo Fenalce.png' }
  ]);
  ngOnInit() {
    this.getOrganizations();
  }
  async getOrganizations() {
    const res = await this.api.getOrganizations();
    console.log(res);
  }
}
