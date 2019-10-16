import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskMessageActions, taskDeleteMessage } from './taskMessage.action';


export type deleteStatus = 'success' | 'failed';
export interface TaskMessage {
  status: deleteStatus | null;
}

const tasksMessageFeature = createFeatureSelector<TaskMessage>('taskMessage');
export const getTaskMessage = createSelector(tasksMessageFeature, (state) => state);

const initialState: TaskMessage = {
  status: null
};

export function taskMessageReducer(state = initialState, actions: TaskMessageActions): TaskMessage {
  switch (actions.type) {
    case taskDeleteMessage.type:
      return {
        status: actions.payload.status
      };
    default:
      return state;
  }
}
