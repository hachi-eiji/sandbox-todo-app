import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TaskFacade } from './shared/task.facade';
import { Tasks } from './shared/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Tasks>;

  constructor(private taskFacade: TaskFacade) {
  }

  ngOnInit() {
    this.tasks$ = this.taskFacade.getList();
  }

  delete(id: number) {
    console.log(id);
  }
}
