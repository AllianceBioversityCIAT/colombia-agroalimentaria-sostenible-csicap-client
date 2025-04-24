import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputComponent } from '../../../../../../shared/components/custom-fields/input/input.component';
import { SelectComponent } from '../../../../../../shared/components/custom-fields/select/select.component';

interface Organization {
  name: string;
}

@Component({
  selector: 'app-user-form',
  imports: [
    DrawerModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    FormsModule,
    InputComponent,
    MultiSelectModule,
    SelectComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  visible = signal(false);
  value: string | undefined;
  selectedOption: string | null = null;

  organizations!: Organization[];

  ngOnInit() {
    this.organizations = [];
  }

  openDrawer() {
    this.visible.set(true);
  }

  closeDrawer() {
    this.visible.set(false);
  }
}
