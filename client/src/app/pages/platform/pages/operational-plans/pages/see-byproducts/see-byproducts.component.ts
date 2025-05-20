import { Component, signal, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../../../../../shared/services/api.service';
import { GetSubProductos, Subproducto, Subproducto2 } from '../../../../../../shared/interfaces/get/get-sub-productos.interface';
@Component({
  selector: 'app-see-byproducts',
  imports: [ButtonModule, TooltipModule, CommonModule, RouterModule, TabsModule, DialogModule],
  templateUrl: './see-byproducts.component.html'
})
export default class SeeByproductsComponent implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  dialogVisible = signal({ value: false });
  subproductoIndex = signal(0);
  subproductos = signal<Subproducto[]>([]);
  currentSubproducto = signal<Subproducto2>({} as Subproducto2);
  data = signal<GetSubProductos>({} as GetSubProductos);

  ngOnInit() {
    this.getSubProductos();
  }

  async getSubProductos(index?: number) {
    // get product id from url
    this.subproductoIndex.set(index ?? 0);

    const productId = this.route.snapshot.params['id'];
    this.currentSubproducto.set({} as Subproducto2);
    const res = await this.api.getSubProductos(productId, this.subproductos()[this.subproductoIndex()]?.sp_id);
    console.log(res.data);

    this.data.set(res.data);
    this.subproductos.set(res.data.subproductos);
    this.currentSubproducto.set(res.data.hitosxsubproducto[0]?.subproductos[0]);
  }
}
