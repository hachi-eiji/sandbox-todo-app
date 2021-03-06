import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from '../ngrx-debug';
import { SharedModule } from '../shared/shared.module';
import { taskMessageReducer } from './message/taskMessage.reducer';
import { tasksReducer } from './shared/tasks.reducer';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    StoreModule.forFeature('tasks', tasksReducer, { metaReducers }),
    StoreModule.forFeature('taskMessage', taskMessageReducer, { metaReducers }),
    FormsModule,
  ],
  declarations: [TasksComponent, TaskCreateComponent]
})
export class TasksModule {}
