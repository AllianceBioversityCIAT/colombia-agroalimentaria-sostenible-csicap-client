import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { PageTitleService } from '../../services/page-title.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  private destroy$ = new Subject<void>();
  private pageTitleService = inject(PageTitleService);

  get home(): MenuItem {
    return this.pageTitleService.home;
  }

  ngOnInit() {
    this.pageTitleService.breadcrumb$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.items = items;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
