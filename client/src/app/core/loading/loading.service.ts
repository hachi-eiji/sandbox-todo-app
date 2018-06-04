import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // EventEmitterを使わない理由
  // https://stackoverflow.com/questions/36076700/what-is-the-proper-use-of-an-eventemitter/36076701#36076701
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  constructor() {
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
