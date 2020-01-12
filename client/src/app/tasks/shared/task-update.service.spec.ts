import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskUpdateService } from './task-update.service';
import { Task } from './task.model';

describe('TaskUpdateService', () => {
  let service: TaskUpdateService;
  const httpServiceSpy = jasmine.createSpyObj('HttpService', ['put']);
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new TaskUpdateService(httpServiceSpy);
  });

  it('should be update', () => {
    const mock: Task = {
      id: 1, title: 'title',
      description: 'description', due_date: '2020-01-01',
    };
    httpServiceSpy.put.and.returnValue(of(mock));
    service.call(mock).subscribe((d) => {
      expect(d).toEqual(mock);
    });
  });
});
