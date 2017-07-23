import { Injectable } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpResponse } from '../common/HttpResponse';
import { HttpClientService } from '../common/http-client.service';
import { Tasks } from '../common/Tasks';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient, private httpClientService: HttpClientService) {
  }

  list(): Observable<Tasks> {
    return this.httpClientService.get<Tasks>('/tasks');
  }

  delete(id: number): Observable<HttpResponse> {
    return this.httpClient.deleteJson(`/tasks/${id}`);
  }
}
