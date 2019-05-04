import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TaskFacade } from './task.facade';
import { Task } from './task.model';
import * as TasksAction from './tasks.actions';
import { Tasks } from './tasks.model';
import { tasksReducer } from './tasks.reducer';

describe('TaskFacade', () => {
  let store: Store<Task>;
  let tester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('tasks', tasksReducer)
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    tester = new TaskFacade(store);
  }));

  it('should empty ', () => {
    const tasks: Tasks = { data: [], status: 200 };
    const taskFetch = TasksAction.taskFetchSuccess({ tasks });
    store.dispatch(taskFetch);
    tester.getList().subscribe(actual => {
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
    const action = TasksAction.taskFetchSuccess({ tasks });
    store.dispatch(action);
    tester.getList().subscribe(actual => {
      expect(tasks.status).toEqual(actual.status);
      expect(tasks.data).toEqual(actual.data);
    });
  });
});
