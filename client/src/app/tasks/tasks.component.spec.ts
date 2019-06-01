import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { TaskFacade } from './shared/task.facade';
import { Tasks } from './shared/tasks.model';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  const taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['fetchList']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        SharedModule,
      ],
      providers: [{
        provide: TaskFacade, useValue: taskFacadeSpy
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  it('should show empty message when no task', () => {
    const tasks: Tasks = { data: [], status: 200 };

    component.tasks$ = (new Observable((observer) => { observer.next(tasks); }));
    taskFacadeSpy.fetchList.and.callFake(() => { });
    fixture.detectChanges(); // onInit()
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

    component.tasks$ = (new Observable((observer) => { observer.next(tasks); }));
    taskFacadeSpy.fetchList.and.callFake(() => { });
    fixture.detectChanges(); // onInit()
    expect(fixture.debugElement.query(By.css('.no-task-message'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.m-done'))).not.toBeNull();
  });
});
