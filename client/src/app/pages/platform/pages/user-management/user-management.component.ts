import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  api = inject(ApiService);

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  async getUsers() {
    const users = await this.api.getUsers();
    console.log(users);
  }

  async getRoles() {
    const roles = await this.api.getRoles();
    console.log(roles);
  }
}
