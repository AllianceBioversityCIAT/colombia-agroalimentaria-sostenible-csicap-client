import { Injectable, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

interface BreadcrumbItem {
  path: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class PageTitleService implements OnDestroy {
  private readonly APP_NAME = 'CAS Reporting Tool';
  private titleService = inject(Title);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Subjects for title and breadcrumb
  private titleSubject = new BehaviorSubject<string>('Menu principal');
  private breadcrumbSubject = new BehaviorSubject<MenuItem[]>([]);

  // Public observables
  public title$ = this.titleSubject.asObservable();
  public breadcrumb$ = this.breadcrumbSubject.asObservable();
  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor() {
    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateNavigationData();
      });
  }

  private updateNavigationData(): void {
    const currentRoute = this.router.routerState.snapshot.root;
    let breadcrumbs: BreadcrumbItem[] = [];
    let pageTitle = 'Menu principal';

    // Recursively find breadcrumb data
    const findBreadcrumbData = (route: ActivatedRouteSnapshot) => {
      if (route.data && route.data['breadcrumb']) {
        breadcrumbs = route.data['breadcrumb'];
      }
      if (route.firstChild) {
        findBreadcrumbData(route.firstChild);
      }
    };

    findBreadcrumbData(currentRoute);

    // Update breadcrumb items
    if (breadcrumbs.length > 0) {
      const breadcrumbItems = breadcrumbs.map(item => ({
        label: item.label,
        routerLink: `/${item.path}`
      }));
      this.breadcrumbSubject.next(breadcrumbItems);
    } else {
      this.breadcrumbSubject.next([]);
    }

    // Update page title
    if (breadcrumbs.length > 0) {
      pageTitle = breadcrumbs[breadcrumbs.length - 1].label;
    }
    this.titleSubject.next(pageTitle);
    this.titleService.setTitle(`${pageTitle} | ${this.APP_NAME}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
