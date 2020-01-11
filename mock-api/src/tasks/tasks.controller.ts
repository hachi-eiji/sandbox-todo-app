import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { Task } from './Task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  find(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  create() {
    return this.tasksService.create();
  }

  @Put()
  update() {
    return this.tasksService.update();
  }

  @Delete()
  delete() {
    return this.tasksService.delete();
  }
}
