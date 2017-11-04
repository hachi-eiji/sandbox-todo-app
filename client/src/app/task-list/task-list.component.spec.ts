import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TaskService } from '../task/task.service';

import { TaskListComponent } from './task-list.component';
import { AlertComponent } from '../alert/alert.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../loading/loading.component';
import { TokenStorageService } from '../common/token-storage.service';
import { Task } from '../task/task.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from '../common/http-client.service';
import { Tasks } from '../task/tasks.model';
import { TaskComponent } from '../task/task.component';
import { FormsModule } from '@angular/forms';

describe('TaskListComponent', () => {
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        TaskService,
        HttpClientService,
        TokenStorageService,
        {provide: Router, useValue: mockRouter}
      ],
      declarations: [
        TaskListComponent,
        AlertComponent,
        ConfirmModalComponent,
        LoadingComponent,
        TaskComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.confirmModal = null;
    component.alert = null;
    taskService = fixture.debugElement.injector.get(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get my task list', async(() => {
    const tasks: Tasks = {
      data: [],
      status: 200
    };
    for (let i = 0; i < 5; i++) {
      tasks.data.push(
        Task.create(
          {
            id: i,
            title: `title_${i}`,
            description: `description_${i}`,
            due_date: '2017-02-01'
          }
        )
      );
    }
    spyOn(taskService, 'list').and.returnValue(Observable.of(tasks));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.tasks.length).toEqual(5);
      expect(component.showLoading).toBeFalsy();
    });
  }));
});
