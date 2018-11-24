import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from '../ngrx-debug';
import { SharedModule } from '../shared/shared.module';
import { TaskEffect } from './shared/task.effect';
import { taskReducer } from './shared/task.reducer';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    StoreModule.forFeature('task', taskReducer, { metaReducers }),
    EffectsModule.forFeature([TaskEffect])
  ],
  declarations: [TasksComponent]
})
export class TasksModule {}
