import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task.model';
import { Router } from '@angular/router';
import { Modal } from '../confirm-modal/modal.model';
import { Alert } from '../alert/alert.model';
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

  showCreateButton = false;

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

  createTask() {
    this.showCreateButton = true;
  }

  /**
   * タスク作成のcallback
   */
  createTaskCallback(success: boolean) {
    this.showCreateButton = false;
    if (success === true) {
      this.alert = new Alert('作成しました', 'success');
      this.fetch();
    } else if (success === false) {
      this.alert = new Alert('作成に失敗しました');
    }
  }

  private fetch() {
    this.taskService.list()
      .subscribe(
        response => {
          this.tasks = response.data;
          this.showLoading = false;
        },
        error => {
          if (error.status === 404 && error.message === 'user_not_found') {
            this.router.navigate(['login']);
          }
        }
      );
  }
}
