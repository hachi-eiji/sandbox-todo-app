import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }

  private static getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json'
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

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error);
    } else {
      return throwError(error);
    }
  }

  get<T>(path: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpService.getHeaders(),
      params: HttpService.createParams(data),
      withCredentials: true
    };
    return this.httpClient.get<T>(environment.api.url + path, options)
      .pipe(catchError(HttpService.handleError));
  }

  post<T>(path: string, data?: {}): Observable<T> {
    const params = HttpService.createParams(data);
    const options = {
      headers: HttpService.getHeaders(),
      withCredentials: true
    };
    return this.httpClient
      .post<T>(environment.api.url + path, params, options)
      .pipe(catchError(HttpService.handleError));
  }
}
