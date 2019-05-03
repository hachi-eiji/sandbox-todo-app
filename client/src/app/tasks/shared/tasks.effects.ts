import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { TaskService } from './task.service';
import { taskFetch, taskFetchSuccess } from './tasks.actions';

@Injectable()
export class TasksEffects {
  @Effect()
  tasks$ = this.actions$.pipe(
    ofType(taskFetch.type),
    concatMap(() => this.service.getList().pipe(map(tasks => taskFetchSuccess({ tasks }))))
  );

  constructor(private actions$: Actions, private service: TaskService) {}
}
