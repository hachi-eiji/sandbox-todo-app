import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TaskService } from './task.service';
import { HttpClient } from '../common/HttpClient';
import { TokenStorage } from '../common/TokenStorage';
import { Task } from './Task';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [TaskService, HttpClient, TokenStorage]
    });
  });

  it('should ...', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should get task list', inject([TaskService], (service: TaskService) => {
    const tasks: Task[] = [];
    for (let i = 0; i < 5; i++) {
      tasks.push(
        Task.create({
          id: i,
          title: `title_${i}`,
          description: `description_${i}`,
          due_date: new Date(2017, 2, 1)
        })
      );
    }
    spyOn(service, 'list').and.returnValue(Observable.of(tasks));

    const result = service.list();
    result.subscribe(subscribe => {
      expect(subscribe.length).toEqual(5);
    });
  }));
});
