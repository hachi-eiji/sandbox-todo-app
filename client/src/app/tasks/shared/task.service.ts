import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from '../../core/http/http.service';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpService: HttpService) {}

  getList(): Observable<Tasks> {
    return this.httpService.get<Tasks>('/tasks');
  }
}
