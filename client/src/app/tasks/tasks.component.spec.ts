import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TaskFacade } from './shared/task.facade';
import { Tasks } from './shared/tasks.model';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['getList']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        CoreModule,
        CommonModule,
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
    const tasks: Tasks = {
      data: [], status: 200
    };
    taskFacadeSpy.getList.and.returnValue(new Observable((observer) => { observer.next(tasks); }));
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

    taskFacadeSpy.getList.and.returnValue(new Observable((observer) => { observer.next(tasks); }));
    fixture.detectChanges(); // onInit()
    expect(fixture.debugElement.query(By.css('.no-task-message'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.m-done'))).not.toBeNull();
  });
});
