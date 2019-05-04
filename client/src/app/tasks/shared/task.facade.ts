import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import * as TasksActions from './tasks.actions';
import { Tasks } from './tasks.model';
import * as TasksReducer from './tasks.reducer';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {
  private tasks$: Observable<Tasks>;

  constructor(private store: Store<Task>) {
  }

  getList(): Observable<Tasks> {
    this.store.dispatch(TasksActions.taskFetch());
    this.tasks$ = this.store.pipe(select(TasksReducer.getTasks));
    return this.tasks$;
  }
}
