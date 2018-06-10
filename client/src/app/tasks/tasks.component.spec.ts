import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TaskService } from './shared/task.service';
import { Tasks } from './shared/tasks.model';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskService;

  beforeEach(async(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getList']);
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [CoreModule, CommonModule, SharedModule],
      providers: [{
        provide: TaskService, useValue: taskService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  it('should show empty message when no task', () => {
    const data: Tasks = { data: [], status: 200 };
    const spy = taskService.getList.and.returnValue(of(data));
    fixture.detectChanges(); // onInit()
    expect(spy.calls.count()).toEqual(1);
    expect(fixture.debugElement.query(By.css('.no-task-message'))).not.toBeNull();
  });

  it('should show data', () => {
    const data: Tasks = {
      data: [
        { id: 1, title: 'test title', description: 'description', due_date: '2018/01/01' },
        { id: 1, title: 'test title', description: 'description', due_date: null }
      ],
      status: 200
    };
    taskService.getList.and.returnValue(of(data));
    fixture.detectChanges(); // onInit()
    expect(fixture.debugElement.query(By.css('.no-task-message'))).toBeNull();
  });
});
