import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDeleteService {
  constructor(private httpService: HttpService) {
  }

  call(taskId: number): Observable<{ status: number }> {
    return this.httpService.delete<{ status: number }>(`/tasks/${taskId}`);
  }
}
