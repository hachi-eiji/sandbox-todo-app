import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

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
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.hideHeader = this.isHideHeader(event.url);
      }
    });
  }

  private isHideHeader(url: string): boolean {
    return this.HIDE_HEADER_URLS.includes(url);
  }
}
