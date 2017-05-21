import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Task } from '../task/Task';
import { Router } from '@angular/router';
import { Modal } from '../confirm-modal/Modal';
import { Alert } from '../alert/Alert';

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

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.fetch();
  }

  onDeleteTask(task: Task, index: number) {
    this.confirmModal = new Modal('削除する？',
      () => {
        // モデルの破棄
        this.confirmModal = null;
        this.httpClient.deleteJson(`/tasks/${task.id}`)
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
    this.httpClient.getJson('/tasks')
      .subscribe(res => {
        setTimeout(() => {
          this.tasks = res.data.map(value => {
            return Task.create(value);
          });
          this.showLoading = false;
        }, 1000);
      }, e => {
        console.log(e);
        if (e.body.status === 404) {
          if (e.body.message === 'user_not_found') {
            this.router.navigate(['login']);
          }
        }
      });
  }
}
