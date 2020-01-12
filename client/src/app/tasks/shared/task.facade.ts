import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as TaskMessageActions from '../message/taskMessage.action';
import * as TaskMessageReducer from '../message/taskMessage.reducer';
import { TaskService } from './task.service';
import { TaskDeleteService } from './taskDelete.service';
import * as TasksActions from './tasks.actions';
import * as TasksReducer from './tasks.reducer';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {
  private tasks = this.store.pipe(select(TasksReducer.getTasks));
  private message = this.store.pipe(select(TaskMessageReducer.getTaskMessage));

  constructor(
    private store: Store<{}>,
    private taskService: TaskService,
    private taskDeleteService: TaskDeleteService
  ) {
  }

  get tasks$() {
    return this.tasks;
  }

  get message$() {
    return this.message;
  }

  fetchList() {
    this.taskService.getList().subscribe((tasks) => {
      this.store.dispatch(TasksActions.taskFetchSuccess({ tasks }));
    });
  }

  deleteTask(taskId: number) {
    this.taskDeleteService.call(taskId).subscribe(
      {
        next: () => {
          this.store.dispatch(TasksActions.taskDelete(taskId));
          this.store.dispatch(TaskMessageActions.taskDeleteMessage({ status: 'success' }));
        },
        error: () => {
          this.store.dispatch(TaskMessageActions.taskDeleteMessage({ status: 'failed' }));
        }
      }
    );
  }
}
