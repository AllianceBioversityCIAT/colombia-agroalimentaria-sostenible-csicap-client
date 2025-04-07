import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    FormsModule,
    AutoCompleteModule,
    AvatarModule,
    OverlayBadgeModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule
  ],
  templateUrl: './toolbar.component.html'
})
export default class ToolbarComponent {
  items: [] | undefined;
  selectedItem: string | undefined;
  suggestions: string[] | undefined;
  text1: string | undefined;
  cache = inject(CacheService);
  getNameInitiales = computed(() => {
    const userData = this.cache.dataCache()?.user;
    if (!userData?.nombre || !userData?.apellido) {
      return '';
    }
    return userData.nombre.charAt(0) + userData.apellido.charAt(0);
  });
  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
}
