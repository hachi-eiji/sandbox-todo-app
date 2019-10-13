import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActions, taskFetchSuccess, taskFetch, taskDelete } from './tasks.actions';
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

export function tasksReducer(state = initialState, action: TaskActions): TaskState {
  console.log(action.type, state);
  switch (action.type) {
    case taskFetchSuccess.type:
      return action.payload;
    case taskFetch.type:
      return state;
    case taskDelete.type:
      const tasks = state.tasks.data.filter(task => {
        return task.id !== action.payload;
      });
      return {
        tasks: {
          data: tasks,
          status: state.tasks.status
        }
      };

    default:
      return state;
  }
}
