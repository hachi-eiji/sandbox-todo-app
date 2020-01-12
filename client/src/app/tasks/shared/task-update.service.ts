import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../core/http/http.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskUpdateService {

  constructor(private httpService: HttpService) {
  }

  call(task: Task): Observable<Task> {
    return this.httpService.put<Task>(`${environment.api}/tasks/${task.id}`, task);
  }
}
