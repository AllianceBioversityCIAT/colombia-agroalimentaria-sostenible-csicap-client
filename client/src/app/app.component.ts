import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'client';
}
