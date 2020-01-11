import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
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
    return result;
  }

  create() {
    return { status: '201', message: 'ok' };
  }
}
