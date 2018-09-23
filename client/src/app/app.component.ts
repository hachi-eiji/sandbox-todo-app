import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs/operators';
import * as AuthAction from './shared/user/auth.action';
import { User } from './shared/user/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeader: boolean;

  constructor(router: Router, private activatedRoute: ActivatedRoute, store: Store<User>) {
    router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd),
      map(() => this.getCurrentActivatedRoute()),
      mergeMap(route => route.data)
    ).subscribe((data: Data) => this.handleSubscribe(data));
    store.dispatch(new AuthAction.AuthAction());
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
