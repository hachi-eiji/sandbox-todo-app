import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActions, taskFetchSuccess, taskFetch, taskDelete, taskUpdate, taskEdit } from './tasks.actions';
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
          status: state.tasks.status,
        },
      };
    case taskUpdate.type:
      const updateTask = action.payload.task;
      const findIndex = state.tasks.data.findIndex(value => value.id === updateTask.id);
      state.tasks.data[findIndex] = updateTask;
      state.tasks.data[findIndex].edit = false;
      return {
        tasks: {
          data: state.tasks.data,
          status: state.tasks.status,
        },
      };
    case taskEdit.type:
      const editTask = action.payload.task;
      const index = state.tasks.data.findIndex(value => value.id === editTask.id);
      state.tasks.data.forEach(value => {
        value.edit = false;
      });
      state.tasks.data[index].edit = true;
      return {
        tasks: {
          data: state.tasks.data,
          status: state.tasks.status,
        },
      };
    default:
      return state;
  }
}
