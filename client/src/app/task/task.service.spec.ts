import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TaskService } from './task.service';
import { HttpClient } from '../common/HttpClient';
import { TokenStorage } from '../common/TokenStorage';

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
});
