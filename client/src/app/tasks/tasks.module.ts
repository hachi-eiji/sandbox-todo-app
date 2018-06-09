import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule
  ],
  declarations: [TasksComponent]
})
export class TasksModule { }
