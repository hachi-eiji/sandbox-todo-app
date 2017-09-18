import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { HttpClientService } from '../common/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      providers: [TaskService, HttpClientService],
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = fixture.debugElement.injector.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should event emmit true register button', () => {
    spyOn(taskService, 'create').and.returnValue(Observable.create(o => o.next()));
    component.buttonEvent.subscribe(actual => {
      expect(actual).toBeTruthy();
    });
    fixture.debugElement.query(By.css('[id=register]')).nativeElement.click();
    fixture.detectChanges();
  });

  it('should event emmit false when an error occurred', () => {
    spyOn(taskService, 'create').and.returnValue(Observable.throw('error'));
    component.buttonEvent.subscribe(actual => {
      expect(actual).toBeFalsy();
    });
    fixture.debugElement.query(By.css('[id=register]')).nativeElement.click();
    fixture.detectChanges();
  });

  it('should cancel button', () => {
    spyOn(taskService, 'create').and.returnValue(Observable.create(o => o.next()));
    component.buttonEvent.subscribe(actual => {
      expect(actual).toEqual(undefined);
    });
    fixture.debugElement.query(By.css('[id=cancel]')).nativeElement.click();
    fixture.detectChanges();
  });
});
