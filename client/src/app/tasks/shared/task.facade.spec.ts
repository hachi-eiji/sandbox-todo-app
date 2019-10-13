import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskFacade } from './task.facade';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskDeleteService } from './taskDelete.service';
import * as TasksActions from './tasks.actions';
import { Tasks } from './tasks.model';
import { tasksReducer } from './tasks.reducer';

describe('TaskFacade', () => {
  let store: Store<Task>;
  let tester: TaskFacade;
  const taskServiceSpyObj = jasmine.createSpyObj('TaskService', ['getList']);
  const taskDeleteServiceSpyObj = jasmine.createSpyObj('TaskDeleteService', ['call']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('tasks', tasksReducer)
      ],
      providers: [
        { provide: TaskService, userValue: taskServiceSpyObj },
        { provide: TaskDeleteService, userValue: taskDeleteServiceSpyObj }
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    tester = new TaskFacade(store, taskServiceSpyObj, taskDeleteServiceSpyObj);
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
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01' },
        { id: 1, title: 'test title', description: 'description', due_date: null }
      ], status: 200
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
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01' },
        { id: 2, title: 'test title', description: 'description', due_date: null }
      ], status: 200
    };
    store.dispatch(TasksActions.taskFetchSuccess({ tasks }));

    taskDeleteServiceSpyObj.call.and.returnValue(new Observable(o => o.next(200)));
    tester.deleteTask(1);
    tester.tasks$.subscribe(actual => {
      expect(actual.status).toEqual(tasks.status);
      expect(actual.data).toEqual([
        { id: 2, title: 'test title', description: 'description', due_date: null }
      ]);
    });
  });
});
