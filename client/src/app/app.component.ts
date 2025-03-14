import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalAlertComponent } from './shared/components/global-alert/global-alert.component';
import { CopyTokenComponent } from './shared/components/copy-token/copy-token.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalAlertComponent, CopyTokenComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'CAS Reporting Tool';
}
