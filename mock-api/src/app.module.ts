import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionController } from './me/session.controller';
import { TokenController } from './token.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    SessionController,
    TokenController,
  ],
  providers: [AppService],
})
export class AppModule {
}
