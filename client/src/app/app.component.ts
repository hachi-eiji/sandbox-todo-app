import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeader: boolean;

  constructor(router: Router, private activatedRoute: ActivatedRoute) {
    router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd),
      map(() => this.getCurrentActivatedRoute()),
      mergeMap(route => route.data)
    ).subscribe((data: Data) => this.handleSubscribe(data));
  }

  private getCurrentActivatedRoute(): ActivatedRoute {
    let route = this.activatedRoute.firstChild;
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
  }

  private handleSubscribe(data: Data) {
    this.checkInvisibleHeader(data);
  }

  private checkInvisibleHeader(data: Data) {
    this.hideHeader = data && !!data.isInvisibleHeader;
  }
}
