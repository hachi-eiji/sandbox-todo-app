import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TaskService } from './shared/task.service';
import { Tasks } from './shared/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Tasks>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.fetch();
  }

  delete(id: number) {
    console.log(id);
  }

  private fetch() {
    this.tasks$ = this.taskService.getList();
  }
}
