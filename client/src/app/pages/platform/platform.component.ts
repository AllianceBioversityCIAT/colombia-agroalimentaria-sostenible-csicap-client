import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from '../../shared/components/sidebar/sidebar.component';
import ToolbarComponent from '../../shared/components/toolbar/toolbar.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllModalsComponent } from '../../shared/components/all-modals/all-modals.component';

@Component({
  selector: 'app-platform',
  imports: [
    RouterOutlet,
    SidebarComponent,
    ToolbarComponent,
    BreadcrumbComponent,
    AllModalsComponent
  ],
  templateUrl: './platform.component.html'
})
export default class PlatformComponent {}
