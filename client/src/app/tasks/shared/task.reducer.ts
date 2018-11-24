import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActionUnion, TaskActionTypes } from './task.action';
import { Tasks } from './tasks.model';

export interface TaskState {
  tasks: Tasks | null;
}

const taskFeature = createFeatureSelector<TaskState>('task');
export const getTasks = createSelector(taskFeature, state => {
  return state.tasks;
});

const initialState: TaskState = {
  tasks: null
};

export function taskReducer(state = initialState, action: TaskActionUnion): TaskState {
  console.log(action.type, state);
  switch (action.type) {
    case TaskActionTypes.FETCH_SUCCESS:
      return action.payload;
    case TaskActionTypes.FETCH:
      return state;
    default:
      return state;
  }
}
