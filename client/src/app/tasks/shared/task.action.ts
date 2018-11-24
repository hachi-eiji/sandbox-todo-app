import { Action } from '@ngrx/store';
import { Tasks } from './tasks.model';

export enum TaskActionTypes {
  FETCH = '[Task Page] List',
  FETCH_SUCCESS = '[Task API] fetch_success'
}

export class FetchTasksAction implements Action {
  type = TaskActionTypes.FETCH;

  constructor(public payload?) {}
}

export class FetchSuccessAction implements Action {
  type = TaskActionTypes.FETCH_SUCCESS;

  constructor(public payload: { tasks: Tasks }) {}
}

export type TaskActionUnion = FetchTasksAction | FetchSuccessAction;
