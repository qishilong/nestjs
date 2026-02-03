import { forwardRef, Module } from '@nestjs/common';
import { CircularService } from './circular.service';
import { CircularController } from './circular.controller';
import { CircularCommonModule } from './common.module';

@Module({
  imports: [forwardRef(() => CircularCommonModule)], // 模块正向引用，解决循环依赖问题
  controllers: [CircularController],
  providers: [CircularService],
  exports: [],
})
export class CircularModule {}
