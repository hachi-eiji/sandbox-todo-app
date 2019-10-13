import { union, createAction } from '@ngrx/store';
import { Tasks } from './tasks.model';

export const taskFetch = createAction('[Task Page] List', (payload?) => ({ payload }));

export const taskFetchSuccess = createAction('[Task API] fetch_success', (payload: { tasks: Tasks }) => ({ payload }));

export const taskDelete = createAction('[Task API] Delete', (payload: number) => ({ payload }));

const actions = union({
  taskFetch,
  taskFetchSuccess,
  taskDelete
});
export type TaskActions = typeof actions;
