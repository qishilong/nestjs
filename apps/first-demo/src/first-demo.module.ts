import { Module } from '@nestjs/common';
import { FirstDemoController } from './first-demo.controller';
import { FirstDemoService } from './first-demo.service';

@Module({
  imports: [],
  controllers: [FirstDemoController],
  providers: [FirstDemoService],
})
export class FirstDemoModule {}
