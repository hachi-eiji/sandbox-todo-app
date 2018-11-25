import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as TaskAction from './tasks.actions';
import { TaskActionTypes } from './tasks.actions';
import { TaskService } from './task.service';

@Injectable()
export class TasksEffects {
  @Effect()
  tasks$ = this.actions$.pipe(
    ofType(TaskActionTypes.FETCH),
    concatMap(() => this.service.getList().pipe(map(tasks => new TaskAction.FetchSuccessAction({ tasks }))))
  );

  constructor(private actions$: Actions, private service: TaskService) {}
}
