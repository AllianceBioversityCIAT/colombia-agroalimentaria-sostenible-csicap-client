import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from '../../shared/components/sidebar/sidebar.component';
import ToolbarComponent from '../../shared/components/toolbar/toolbar.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CacheService } from '../../shared/services/cache/cache.service';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-platform',
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent, BreadcrumbComponent],
  templateUrl: './platform.component.html'
})
export default class PlatformComponent implements OnInit {
  cache = inject(CacheService);
  api = inject(ApiService);
  ngOnInit() {
    this.getCurrentUser();
  }
  async getCurrentUser() {
    const response = await this.api.getCurrentUser();
    if (response.successfulRequest) this.cache.currentUser.set(response.data[0]);
  }
}
