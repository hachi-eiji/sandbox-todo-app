import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  find() {
    return {
      status: 200,
      data: this.tasksService.findAll(),
    };
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
