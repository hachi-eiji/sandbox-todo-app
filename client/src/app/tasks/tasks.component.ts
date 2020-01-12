import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TaskMessage } from './message/taskMessage.reducer';
import { TaskFacade } from './shared/task.facade';
import { Tasks } from './shared/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Tasks>;
  message$: Observable<TaskMessage> | null; // ちゃんとnullを入れるべきか?

  constructor(private taskFacade: TaskFacade) {
    this.tasks$ = taskFacade.tasks$;
    this.message$ = taskFacade.message$;
  }

  ngOnInit() {
    this.taskFacade.fetchList();
  }

  delete(id: number) {
    this.taskFacade.deleteTask(id);
  }
}
