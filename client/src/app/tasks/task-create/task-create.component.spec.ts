import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TaskFacade } from '../shared/task.facade';

import { TaskCreateComponent } from './task-create.component';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
  const taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['fetchList']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreateComponent],
      imports: [SharedModule],
      providers: [
        { provide: TaskFacade, useValue: taskFacadeSpy },
        { provide: Router, useValue: router },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
