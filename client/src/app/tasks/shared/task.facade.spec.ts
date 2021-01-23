import { TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { taskMessageReducer } from '../message/taskMessage.reducer';
import { TaskRegisterService } from './task-register.service';
import { TaskUpdateService } from './task-update.service';
import { TaskFacade } from './task.facade';
import { TaskService } from './task.service';
import { TaskDeleteService } from './taskDelete.service';
import * as TasksActions from './tasks.actions';
import { Tasks } from './tasks.model';
import { tasksReducer } from './tasks.reducer';

describe('TaskFacade', () => {
  let store: Store<{}>;
  let tester: TaskFacade;
  const taskServiceSpyObj = jasmine.createSpyObj('TaskService', ['getList']);
  const taskDeleteServiceSpyObj = jasmine.createSpyObj('TaskDeleteService', ['call']);
  const taskUpdateServiceSpyObj = jasmine.createSpyObj('TaskUpdateService', ['call']);
  const taskRegisterServiceSpyObj = jasmine.createSpyObj('TaskRegisterService', ['call']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('tasks', tasksReducer),
        StoreModule.forFeature('taskMessage', taskMessageReducer)
      ],
      providers: [
        { provide: TaskService, userValue: taskServiceSpyObj },
        { provide: TaskDeleteService, userValue: taskDeleteServiceSpyObj },
        { provide: TaskUpdateService, userValue: taskUpdateServiceSpyObj },
        { provide: TaskRegisterService, userValue: taskRegisterServiceSpyObj }
      ]
    }).compileComponents();
    store = TestBed.inject<Store<{}>>(Store);
    tester = new TaskFacade(store, taskServiceSpyObj, taskDeleteServiceSpyObj, taskUpdateServiceSpyObj, taskRegisterServiceSpyObj);
  }));

  it('should empty ', () => {
    const tasks: Tasks = { data: [], status: 200 };
    taskServiceSpyObj.getList.and.returnValue(new Observable(observable => observable.next(tasks)));
    tester.fetchList();
    tester.tasks$.subscribe(actual => {
      expect(tasks.status).toEqual(actual.status);
      expect(tasks.data).toEqual(actual.data);
    });
  });

  it('should get tasks', () => {
    const tasks: Tasks = {
      data: [
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01', edit: false },
        { id: 1, title: 'test title', description: 'description', due_date: null, edit: false }
      ],
      status: 200
    };
    taskServiceSpyObj.getList.and.returnValue(new Observable(observable => observable.next(tasks)));
    tester.fetchList();
    tester.tasks$.subscribe(actual => {
      expect(tasks.status).toEqual(actual.status);
      expect(tasks.data).toEqual(actual.data);
    });
  });

  it('should get a task when task deletes', () => {
    const tasks: Tasks = {
      data: [
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01', edit: false },
        { id: 2, title: 'test title', description: 'description', due_date: null, edit: false }
      ],
      status: 200
    };
    store.dispatch(TasksActions.taskFetchSuccess({ tasks }));

    taskDeleteServiceSpyObj.call.and.returnValue(new Observable(o => o.next(200)));
    tester.deleteTask(1);
    tester.tasks$.subscribe(actual => {
      expect(actual.status).toEqual(tasks.status);
      expect(actual.data).toEqual([
        { id: 2, title: 'test title', description: 'description', due_date: null, edit: false }
      ]);
    });
  });

  it('should get tasks when task can not delete', () => {
    const tasks: Tasks = {
      data: [
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01', edit: false },
        { id: 2, title: 'test title', description: 'description', due_date: null, edit: false }
      ],
      status: 200
    };
    store.dispatch(TasksActions.taskFetchSuccess({ tasks }));
    taskDeleteServiceSpyObj.call.and.callFake(() => {
      return throwError({ message: 'task not found' });
    });

    tester.deleteTask(1);
    tester.tasks$.subscribe(actual => {
      expect(actual.status).toEqual(tasks.status);
      expect(actual.data).toEqual(tasks.data);
    });
  });
});
