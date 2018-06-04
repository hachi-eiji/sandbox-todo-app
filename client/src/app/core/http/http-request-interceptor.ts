import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from 'app/core/loading/loading.service';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private  loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    // TODO: check auth
    return next.handle(req)
      .pipe(
        catchError((err) => {
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
