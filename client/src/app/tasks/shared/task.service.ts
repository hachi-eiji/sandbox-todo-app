import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from '../../core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) { }

  getList(): Observable<any> {
    return this.httpService.get('/tasks');
  }
}
