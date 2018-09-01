import { Component } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, Event, NavigationEnd, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeader: boolean;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd),
      map(() => {
        let route = activatedRoute.firstChild;
        let child = route;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }
        return route;
      }),
      mergeMap(route => route.data),
    )
    .subscribe((d: Data) => this.hideHeader = d && !!d.isInvisibleHeader);
  }
}
