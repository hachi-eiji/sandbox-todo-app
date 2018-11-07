import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  private static headers(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json'
    });
  }

  private static createParams(data?: {}): HttpParams {
    let params = new HttpParams();
    if (!data) {
      return params;
    }
    Object.keys(data).forEach(k => {
      params = params.set(k, data[k]);
    });
    return params;
  }

  private static handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(err.error);
  }

  constructor(private httpClient: HttpClient) {}

  get<T>(endPoint: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpClientService.headers(),
      params: HttpClientService.createParams(data),
      withCredentials: true
    };
    return this.httpClient
      .get<T>(environment.api.url + endPoint, options)
      .pipe(catchError(HttpClientService.handleError));
  }

  post<T>(endPoint: string, data?: {}): Observable<T> {
    const params = HttpClientService.createParams(data);
    const options = {
      headers: HttpClientService.headers(),
      withCredentials: true
    };
    return this.httpClient
      .post<T>(environment.api.url + endPoint, params, options)
      .pipe(catchError(HttpClientService.handleError));
  }

  delete<T>(endPoint: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpClientService.headers(),
      params: HttpClientService.createParams(data),
      withCredentials: true
    };

    return this.httpClient
      .delete<T>(environment.api.url + endPoint, options)
      .pipe(catchError(HttpClientService.handleError));
  }
}
