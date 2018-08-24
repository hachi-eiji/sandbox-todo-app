import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { Tasks } from './tasks.model';

describe('TaskService', () => {
  let service;
  const httpServiceSpy = jasmine.createSpyObj('HttpService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new TaskService(httpServiceSpy);
  });

  it('#getList should empty list when response is empty', () => {
    httpServiceSpy.get.and.returnValue(of([]));
    service.getList().subscribe(tasks => {
      expect(tasks.length).toBe(0);
    });
  });

  it('#getList should get task list', () => {
    const array: Task[] = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        id: i,
        due_date: i % 2 === 0 ? '2018/01/01 12:00:00' : null,
        title: `title ${i}`,
        description: i % 2 !== 0 ? `description ${i}` : null,
      });
    }
    const mock: Tasks = { status: 200, data: array };
    httpServiceSpy.get.and.returnValue(of(mock));
    service.getList().subscribe((tasks: Tasks) => {
      expect(tasks.status).toBe(200);
      expect(tasks.data.length).toBe(10);
    });
  });

  it('#getList get error', () => {
    const error = new HttpErrorResponse({
      status: 500, error: '500 Internal Server Error', statusText: 'Internal Server Error'
    });
    httpServiceSpy.get.and.returnValue(throwError(error));
    service.getList().subscribe(d => fail(d), e => {
      expect(e.status).toEqual(500);
    });
  });
});
