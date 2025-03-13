import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalAlertComponent } from './shared/components/global-alert/global-alert.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalAlertComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'CAS Reporting Tool';
}
