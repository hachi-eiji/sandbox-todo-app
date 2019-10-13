import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskDeleteService } from './taskDelete.service';
import * as TasksActions from './tasks.actions';
import * as TasksReducer from './tasks.reducer';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {
  private tasks = this.store.pipe(select(TasksReducer.getTasks));

  constructor(
    private store: Store<Task>,
    private taskService: TaskService,
    private taskDeleteService: TaskDeleteService
  ) {
  }

  get tasks$() {
    return this.tasks;
  }

  fetchList() {
    this.taskService.getList().subscribe((tasks) => {
      this.store.dispatch(TasksActions.taskFetchSuccess({ tasks }));
    });
  }

  deleteTask(taskId: number) {
    try {
      const result = this.taskDeleteService.call(taskId).toPromise();
      this.store.dispatch(TasksActions.taskDelete(taskId));
    } catch {

    }
  }
}
