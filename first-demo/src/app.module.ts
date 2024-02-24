import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module1Module } from './module1/module1.module';

@Module({
  imports: [Module1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
