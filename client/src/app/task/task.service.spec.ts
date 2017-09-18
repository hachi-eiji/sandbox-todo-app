import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TaskService } from './task.service';
import { TokenStorage } from '../common/TokenStorage';
import { Task } from './Task';
import { HttpClientService } from '../common/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { Tasks } from './Tasks';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TaskService, HttpClientService, TokenStorage]
    });
  });

  it('should ...', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should get task list', inject([TaskService], (service: TaskService) => {
    const tasks: Tasks = {
      data: [],
      status: 200
    };
    for (let i = 0; i < 5; i++) {
      tasks.data.push(
        Task.create({
          id: i,
          title: `title_${i}`,
          description: `description_${i}`,
          due_date: '2017-01-01'
        })
      );
    }
    spyOn(service, 'list').and.returnValue(Observable.of(tasks));

    const result = service.list();
    result.subscribe(subscribe => {
      expect(subscribe.data.length).toEqual(5);
    });
  }));
});
