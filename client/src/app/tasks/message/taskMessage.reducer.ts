import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskMessageActions, taskDeleteMessage } from './taskMessage.action';


export interface TaskMessage {
  message: string | null;
  status: string;
}

const tasksMessageFeature = createFeatureSelector<TaskMessage>('taskMessage');
export const getTaskMessage = createSelector(tasksMessageFeature, (state) => state);

const initialState: TaskMessage = {
  message: null,
  status: null
};

export function taskMessageReducer(state = initialState, actions: TaskMessageActions): TaskMessage {
  switch (actions.type) {
    case taskDeleteMessage.type:
      return {
        message: actions.payload.message,
        status: actions.payload.status
      };
    default:
      return state;
  }
}
