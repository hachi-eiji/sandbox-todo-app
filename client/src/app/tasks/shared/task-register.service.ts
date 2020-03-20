import { Injectable } from '@angular/core';

import { HttpService } from '../../core/http/http.service';
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskRegisterService {
  constructor(private httpService: HttpService) {}

  call(task: Task): Observable<Task> {
    return this.httpService.post<Task>(`/tasks`, task);
  }
}
