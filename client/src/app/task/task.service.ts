import { Injectable } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from './Task';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<Task[]> {
    return this.httpClient.getJson('/tasks').map(this.extractData);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.deleteJson(`/tasks/${id}`);
  }

  private extractData(body: any) {
    return body.data.map(d => {
      return Task.create(d);
    });
  }
}
