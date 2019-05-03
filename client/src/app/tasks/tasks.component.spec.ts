import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import * as TasksAction from './shared/tasks.actions';
import { Tasks } from './shared/tasks.model';
import { tasksReducer } from './shared/tasks.reducer';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let store: Store<Tasks>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        CoreModule,
        CommonModule,
        SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('tasks', tasksReducer)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  it('should show empty message when no task', () => {
    const tasks: Tasks = { data: [], status: 200 };
    const action = TasksAction.taskFetchSuccess({ tasks });
    store.dispatch(action);

    fixture.detectChanges(); // onInit()
    component.tasks$.subscribe(data => {
      expect(data.data.length).toEqual(0);
    });
    expect(fixture.debugElement.query(By.css('.no-task-message'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.m-done'))).toBeNull();
  });

  it('should show data', () => {
    const tasks: Tasks = {
      data: [
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01' },
        { id: 1, title: 'test title', description: 'description', due_date: null }
      ], status: 200
    };
    const action = TasksAction.taskFetchSuccess({ tasks });
    store.dispatch(action);

    fixture.detectChanges(); // onInit()
    component.tasks$.subscribe(data => {
      expect(data.data.length).toEqual(2);
    });
    expect(fixture.debugElement.query(By.css('.no-task-message'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.m-done'))).not.toBeNull();
  });
});
