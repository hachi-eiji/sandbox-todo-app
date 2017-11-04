import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Output()
  buttonEvent = new EventEmitter<boolean>();
  model = new Task();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onCreateHandler() {
    this.taskService.create(this.model)
      .subscribe(() => {
        this.buttonEvent.emit(true);
      },
      (error) => this.buttonEvent.emit(false));
  }

  onCancelHandler() {
    this.buttonEvent.emit();
  }
}
