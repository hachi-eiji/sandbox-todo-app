import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './task';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('Tasks Controller', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should be defined', () => {
      const tasks: Task[] = [
        {
          id: 0,
          title: 'title0',
          description: 'description0',
          due_date: '2019-10-10',
        },
        {
          id: 1,
          title: 'title1',
          description: 'description1',
          due_date: null,
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        return tasks;
      });
      expect(controller.find()).toEqual({
        status: 200,
        data: tasks,
      });
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create()).toEqual({ status: '201', message: 'ok' });
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update()).toEqual({ status: 200, message: 'ok' });
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.delete()).toEqual({ status: 200 });
    });
  });
});
