import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognitoService } from '../../shared/services/cognito.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  standalone: true
})
export default class AuthComponent implements OnInit {
  cognito = inject(CognitoService);
  ngOnInit(): void {
    this.cognito.validateCognitoCode();
  }
}
