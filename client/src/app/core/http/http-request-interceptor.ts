import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
        })
      );
  }
}
