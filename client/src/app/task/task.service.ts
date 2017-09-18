import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClientService } from '../common/http-client.service';
import { Tasks } from './Tasks';
import { Task } from './Task';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClientService) {
  }

  list(): Observable<Tasks> {
    return this.httpClient.get<Tasks>('/tasks');
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`/tasks/${id}`);
  }

  create(task: Task): Observable<Object> {
    return this.httpClient.post('/tasks', task);
  }
}
