import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideHeader: boolean;

  private readonly HIDE_HEADER_URLS = [
    '/login'
  ];

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe((e: NavigationStart) => this.hideHeader = this.isInvisibleHeader(e.url));
  }

  private isInvisibleHeader(url: string): boolean {
    return this.HIDE_HEADER_URLS.includes(url);
  }
}
