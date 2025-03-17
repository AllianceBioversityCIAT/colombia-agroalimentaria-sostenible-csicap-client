import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from '../../shared/components/sidebar/sidebar.component';
import ToolbarComponent from '../../shared/components/toolbar/toolbar.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-platform',
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent, BreadcrumbModule],
  templateUrl: './platform.component.html'
})
export default class PlatformComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  ngOnInit() {
    this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
