import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from '../../components/sidebar/sidebar.component';
import ToolbarComponent from '../../components/toolbar/toolbar.component';
@Component({
  selector: 'app-platform',
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent],
  templateUrl: './platform.component.html'
})
 export default class PlatformComponent {

}
