import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './unauthorized.component.html'
})
export default class UnauthorizedComponent {}
