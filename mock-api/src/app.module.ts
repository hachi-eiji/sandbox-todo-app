import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionController } from './me/session.controller';
import { TokenController } from './token.controller';
import { LoginModule } from './login/login.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [LoginModule, TasksModule],
  controllers: [
    AppController,
    SessionController,
    TokenController,
  ],
  providers: [AppService],
})
export class AppModule {
}
