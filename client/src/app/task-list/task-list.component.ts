import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../common/HttpClient';
import { Task } from '../task/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showLoading = true;

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.fetch();
  }

  onDeleteTask(task: Task, index: number) {

    this.fetch();
  }

  onDoneTask(task: Task, index: number) {
    this.fetch();
  }

  private fetch() {
    this.httpClient.getJson('/tasks')
      .subscribe(res => {
        res.data.forEach(value => {
          setTimeout(() => {
            this.showLoading = false;
            this.tasks.push(Task.create(value));
          }, 1000);
        });
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
