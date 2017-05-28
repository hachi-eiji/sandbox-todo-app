import { Component, OnInit } from '@angular/core';
import { Task } from '../task/Task';
import { Router } from '@angular/router';
import { Modal } from '../confirm-modal/Modal';
import { Alert } from '../alert/Alert';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showLoading = true;
  confirmModal: Modal;
  alert: Alert;

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetch();
  }

  onDeleteTask(task: Task, index: number) {
    this.confirmModal = new Modal('削除する？',
      () => {
        // モデルの破棄
        this.confirmModal = null;
        this.taskService.delete(task.id)
          .subscribe(() => {
            this.alert = new Alert('削除しました', 'success');
            // データ再読込
            this.fetch();
          }, e => {
            this.alert = new Alert('削除に失敗しました');
            console.error(e);
          });
      },
      () => {
        this.confirmModal = null;
      }
    );
  }

  onDoneTask(task: Task, index: number) {
    this.fetch();
  }

  private fetch() {
    this.taskService.list()
      .subscribe(tasks => {
        setTimeout(() => {
          this.tasks = tasks;
          this.showLoading = false;
        }, 1000);
      }, e => {
        if (e.status === 404) {
          if (e.message === 'user_not_found') {
            this.router.navigate(['login']);
          }
        }
      });
  }
}
