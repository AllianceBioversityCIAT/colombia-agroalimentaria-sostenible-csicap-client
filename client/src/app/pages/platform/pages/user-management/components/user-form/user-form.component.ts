import { Component, Input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

interface Organization {
  name: string
}

@Component({
  selector: 'app-user-form',
  imports: [DrawerModule, ButtonModule, InputTextModule, MultiSelectModule, RadioButtonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  @Input() visible = false;
  value: string | undefined;
  selectedOption: string | null = null;

  organizations!: Organization[];

  ngOnInit() {
    this.organizations = [
    ];
  }

  closeDrawer() {
    this.visible = false;
  }
}
