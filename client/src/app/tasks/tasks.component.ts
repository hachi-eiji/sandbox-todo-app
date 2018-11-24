import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from './shared/task.model';
import * as TasksActions from './shared/tasks.actions';
import { Tasks } from './shared/tasks.model';
import * as TasksReducer from './shared/tasks.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.pug',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Tasks>;

  constructor(private store: Store<Task>) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(TasksReducer.getTasks));
    this.store.dispatch(new TasksActions.FetchTasksAction());
  }

  delete(id: number) {
    console.log(id);
  }
}
