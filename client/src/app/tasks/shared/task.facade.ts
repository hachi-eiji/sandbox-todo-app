import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as TaskMessageActions from '../message/taskMessage.action';
import * as TaskMessageReducer from '../message/taskMessage.reducer';
import { TaskRegisterService } from './task-register.service';
import { TaskUpdateService } from './task-update.service';
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
  private message = this.store.pipe(select(TaskMessageReducer.getTaskMessage));

  constructor(
    private store: Store<{}>,
    private taskService: TaskService,
    private taskDeleteService: TaskDeleteService,
    private taskUpdateService: TaskUpdateService,
    private taskRegisterService: TaskRegisterService
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
        },
      },
    );
  }

  edit(task: Task) {
    this.store.dispatch(TasksActions.taskEdit({ task }));
  }

  update(task: Task) {
    this.taskUpdateService.call(task).subscribe(() => {
      this.store.dispatch(TasksActions.taskUpdate({ task }));
    });
  }

  create(task: Task) {
    this.taskRegisterService.call(task).subscribe(() => {
      this.store.dispatch(TasksActions.taskCreate({ task }));
    });
  }
}
