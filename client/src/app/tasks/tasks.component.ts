import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as TaskAction from './shared/task.action';
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';
import { Tasks } from './shared/tasks.model';
import * as TaskReducer from './shared/tasks.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.pug',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Tasks>;

  constructor(private taskService: TaskService, private store: Store<Task>) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(TaskReducer.getTasks));
    this.store.dispatch(new TaskAction.FetchTasksAction());
  }

  delete(id: number) {
    console.log(id);
  }
}
