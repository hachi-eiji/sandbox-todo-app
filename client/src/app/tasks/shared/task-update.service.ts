import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskUpdateService {

  constructor(private httpService: HttpService) {
  }

  call(task: Task): Observable<Task> {
    return this.httpService.put<Task>(`/tasks/${task.id}`, task);
  }
}
