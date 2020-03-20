import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskCreateComponent } from './task-create/task-create.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'new', component: TaskCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
