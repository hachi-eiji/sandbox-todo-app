import { Controller, Get } from '@nestjs/common';
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
}
