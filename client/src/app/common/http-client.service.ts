import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(endPoint: string, data?: any): Observable<T> {
    const params = new HttpParams();
    Object.keys(k => {
      params.append(k, data[k]);
    });
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = {
      headers: headers,
      params: params,
      withCredentials: true
    };
    return this.httpClient.get<T>(environment.api.url + endPoint, options);
  }
}
