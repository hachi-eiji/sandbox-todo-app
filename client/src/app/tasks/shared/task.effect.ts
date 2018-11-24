import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as TaskAction from './task.action';
import { TaskActionTypes } from './task.action';
import { TaskService } from './task.service';

@Injectable()
export class TaskEffect {
  @Effect()
  tasks$ = this.actions$.pipe(
    ofType(TaskActionTypes.FETCH),
    concatMap(() => this.service.getList().pipe(map(tasks => new TaskAction.FetchSuccessAction({ tasks }))))
  );

  constructor(private actions$: Actions, private service: TaskService) {}
}
