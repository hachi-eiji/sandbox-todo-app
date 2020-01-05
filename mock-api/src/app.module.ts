import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionController } from './me/session.controller';

@Module({
  imports: [],
  controllers: [AppController, SessionController],
  providers: [AppService],
})
export class AppModule {
}
