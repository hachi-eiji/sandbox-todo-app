import { createAction, union } from '@ngrx/store';

export const taskDeleteMessage = createAction('[Task Message Delete]',
  (payload: { message: string, status: string }) => ({ payload }));

const actions = union({
  taskDeleteMessage
});

export type TaskMessageActions = typeof actions;
