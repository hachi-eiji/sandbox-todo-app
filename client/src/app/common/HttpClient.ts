import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { TokenStorage } from './TokenStorage';
import { HttpResponseError } from './HttpResponseError';

@Injectable()
export class HttpClient {
  constructor(private tokenStorage: TokenStorage, private http: Http) {
  }

  getJson(endPoint: string, data?: any): Observable<any> {
    const params = [];
    if (data) {
      Object.keys(data).forEach(k => {
        const v = encodeURIComponent(data[k]);
        params.push(`${k}=${v}`);
      });
    }
    const query = params.length === 0 ? '' : '?' + params.join('&');

    const self = this;
    return this.http.get(environment.api.url + endPoint + query, this.createOption())
      .map(function (res: Response) {
        const body = res.json();
        if (body.token) {
          self.tokenStorage.save(body.token);
        }
        if (res.ok) {
          return body;
        }
        Observable.throw(new HttpResponseError(res.status, body, res));
      })
      .catch(this.handleError);
  }

  postJson(endPoint: string, data: any): Observable<any> {
    const self = this;
    return this.http.post(environment.api.url + endPoint, JSON.stringify(data), this.createOption())
      .map(function (res: Response) {
        const body = res.json();
        if (body.token) {
          self.tokenStorage.save(body.token);
        }
        if (res.ok) {
          return body;
        }
        Observable.throw(new HttpResponseError(res.status, body, res));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    if (error instanceof Response) {
      const body = error.json() || {};
      return Observable.throw(new HttpResponseError(error.status, body, error));
    }
    return Observable.throw(error.message ? error.message : error.toString());
  }

  private createOption(): RequestOptionsArgs {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    const token = this.tokenStorage.get();
    if (token) {
      headers.append('X-CSRF-Token', token);
    }
    return {
      withCredentials: true,
      headers: headers
    };
  }
}