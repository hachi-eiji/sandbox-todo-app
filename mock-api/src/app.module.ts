import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionController } from './me/session.controller';
import { TokenController } from './token.controller';
import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [
    AppController,
    SessionController,
    TokenController,
  ],
  providers: [AppService],
})
export class AppModule {
}
