import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

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


  constructor(private httpClient: HttpClient) {
  }

  get<T>(endPoint: string, data?: {}): Observable<T> {
    const options = {
      headers: HttpClientService.headers(),
      params: HttpClientService.createParams(data),
      withCredentials: true
    };
    return this.httpClient.get<T>(environment.api.url + endPoint, options)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(err.error);
      });
  }

  post<T>(endPoint: string, data?: {}): Observable<T> {
    const params = HttpClientService.createParams(data);
    const options = {
      headers: HttpClientService.headers(),
      withCredentials: true
    };
    return this.httpClient
      .post<T>(environment.api.url + endPoint, params, options)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(err.error);
      });
  }
}
