import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private titleSubject = new BehaviorSubject<string>('Menu principal');
  public title$ = this.titleSubject.asObservable();
  private readonly APP_NAME = 'CAS Reporting Tool';
  private titleService = inject(Title);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateTitle();
    });
  }

  private updateTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const routeData = route.snapshot.data;
    let pageTitle = 'Menu principal';

    if (routeData['breadcrumb']) {
      const breadcrumbs = routeData['breadcrumb'];

      // Could be used to show the last two breadcrumbs
      // if (breadcrumbs.length >= 2) {
      //   // Get the last two breadcrumbs and join them with ' - '
      //   const lastTwo = breadcrumbs.slice(-2);
      //   pageTitle = `${lastTwo[0].label} - ${lastTwo[1].label}`;
      // } else {
      // If there's only one breadcrumb, use its label
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
      pageTitle = lastBreadcrumb.label;
      // }
    }

    // Update the toolbar title
    this.titleSubject.next(pageTitle);

    // Update the browser tab title
    this.titleService.setTitle(`${pageTitle} | ${this.APP_NAME}`);
  }
}
