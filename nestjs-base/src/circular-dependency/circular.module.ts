import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { CircularService } from './circular.service';
import { CircularController } from './circular.controller';
import { CircularCommonModule } from './common.module';
import { CommonService } from './common.service';
import { LoggerMiddleware } from '../logger.middleware';

@Module({
  imports: [forwardRef(() => CircularCommonModule)], // 模块正向引用，解决循环依赖问题
  controllers: [CircularController],
  providers: [CircularService, CommonService],
  exports: [],
})
export class CircularModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CircularController);
  }
}
