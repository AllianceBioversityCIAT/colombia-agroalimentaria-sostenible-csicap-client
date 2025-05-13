import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-see-byproducts',
  imports: [ButtonModule, TooltipModule, CommonModule, RouterModule, TabsModule],
  templateUrl: './see-byproducts.component.html'
})
export default class SeeByproductsComponent {
  subproductos = [
    { id: 1, nombre: 'Subproducto 1', activo: true },
    { id: 2, nombre: 'Subproducto 2', activo: false },
    { id: 3, nombre: 'Subproducto 3', activo: false },
    { id: 4, nombre: 'Subproducto 4', activo: false }
  ];
}
