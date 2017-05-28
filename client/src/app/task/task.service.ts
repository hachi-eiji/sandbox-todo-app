import { Injectable } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from './Task';
import { HttpResponse } from '../common/HttpResponse';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<Task[]> {
    return this.httpClient.getJson('/tasks').map(this.extractData);
  }

  delete(id: number): Observable<HttpResponse> {
    return this.httpClient.deleteJson(`/tasks/${id}`);
  }

  private extractData(res: HttpResponse) {
    return res.body.data.map(d => {
      return Task.create(d);
    });
  }
}
