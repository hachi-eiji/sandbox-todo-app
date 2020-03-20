import { TestBed } from '@angular/core/testing';

import { TaskRegisterService } from './task-register.service';

describe('TaskRegisterService', () => {
  let service: TaskRegisterService;
  const httpServiceSpy = jasmine.createSpyObj('HttpService', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new TaskRegisterService(httpServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
