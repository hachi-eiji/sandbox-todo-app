import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActions, taskFetchSuccess, taskFetch, taskDelete, taskUpdate, taskEdit, taskCreate } from './tasks.actions';
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
      const updateTodoList = state.tasks.data.map((value, i) => {
        if (findIndex === i) {
          return {
            ...updateTask, edit: false
          };
        } else {
          return value;
        }
      });
      return {
        tasks: {
          data: updateTodoList,
          status: state.tasks.status
        }
      };
    case taskEdit.type:
      const editTask = action.payload.task;
      const index = state.tasks.data.findIndex(value => value.id === editTask.id);
      const editTodoList = state.tasks.data.map((value, i) => {
        return {
          ...value, edit: i === index
        };
      });
      return {
        tasks: {
          data: editTodoList,
          status: state.tasks.status
        }
      };
    case taskCreate.type:
      return state;
    default:
      return state;
  }
}
