import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientService {
  private static headers(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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

  private static handleError(err: HttpErrorResponse): ErrorObservable {
    return Observable.throw(err.error);
  }

  constructor(private httpClient: HttpClient) {
  }

  get<T>(endPoint: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpClientService.headers(),
      params: HttpClientService.createParams(data),
      withCredentials: true
    };
    return this.httpClient.get<T>(environment.api.url + endPoint, options)
      .catch(HttpClientService.handleError);
  }

  post<T>(endPoint: string, data?: {}): Observable<T> {
    const params = HttpClientService.createParams(data);
    const options = {
      headers: HttpClientService.headers(),
      withCredentials: true
    };
    return this.httpClient
      .post<T>(environment.api.url + endPoint, params, options)
      .catch(HttpClientService.handleError);
  }

  delete<T>(endPoint: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpClientService.headers(),
      params: HttpClientService.createParams(data),
      withCredentials: true
    };

    return this.httpClient.delete<T>(environment.api.url + endPoint, options)
      .catch(HttpClientService.handleError);
  }
}
