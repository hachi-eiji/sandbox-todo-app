import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskFacade } from '../shared/task.facade';

import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  task: Task;

  constructor(
    private taskFacade: TaskFacade,
    private router: Router) {
  }

  ngOnInit(): void {
    this.task = {
      id: null,
      title: null,
      due_date: null,
      description: '',
      edit: true
    };
  }

  register() {
    this.taskFacade.create(this.task);
    this.router.navigate(['tasks']);
  }
}
