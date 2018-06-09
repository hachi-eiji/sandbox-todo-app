import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  show = false;
  subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.subscription = this.loadingService.loading$.subscribe((d: boolean) => {
      this.show = d;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
