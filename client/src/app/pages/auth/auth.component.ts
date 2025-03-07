import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  standalone: true
})
export default class AuthComponent implements OnInit {
  code: string | null = null;
  copied = false;

  constructor(private route: ActivatedRoute, private clipboard: Clipboard) {}

  ngOnInit(): void {
    // Extraer el código de la URL usando snapshot
    this.code = this.route.snapshot.queryParamMap.get('code');
    if (this.code) {
      // Copiar el código al portapapeles
      this.clipboard.copy(this.code);
      this.copied = true;
    }
  }
}
