import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should be all object', () => {
      const result = [];
      const date = new Date(2020, 0, 1);
      for (let i = 0; i < 9; i++) {
        result.push({
          id: i * 100,
          title: `タイトル${i}`,
          description: `めっちゃ長い説明なんだけど...そうだね説明${i}`,
          due_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        });
      }
      result.push({
        id: 10,
        title: 'タイトル10',
        description: '説明10',
        due_date: null,
      });
      expect(service.findAll()).toEqual(result);
    });
  });

  describe('create', () => {
    it('should post successes', () => {
      expect(service.create()).toEqual({status: '201', message: 'ok'});
    });
  });
});
