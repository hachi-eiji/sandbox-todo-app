import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingService } from '../loading/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    // TODO: check auth
    return next.handle(req).pipe(
      catchError(err => {
        // TODO: show common error message
        if (err.status >= 500) {
          // Noop
        } else {
          return throwError(err);
        }
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
