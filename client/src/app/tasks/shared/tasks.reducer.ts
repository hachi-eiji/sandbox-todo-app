import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActionUnion, TaskActionTypes } from './task.action';
import { Tasks } from './tasks.model';

export interface TaskState {
  tasks: Tasks | null;
}

const tasksFeature = createFeatureSelector<TaskState>('tasks');
export const getTasks = createSelector(tasksFeature, state => {
  return state.tasks;
});

const initialState: TaskState = {
  tasks: null
};

export function tasksReducer(state = initialState, action: TaskActionUnion): TaskState {
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
