import { createAction, union } from '@ngrx/store';
import { deleteStatus } from './taskMessage.reducer';

export const taskDeleteMessage = createAction('[Task Message Delete]',
  (payload: { status: deleteStatus }) => ({ payload }));

const actions = union({
  taskDeleteMessage
});

export type TaskMessageActions = typeof actions;
