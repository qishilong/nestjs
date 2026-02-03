import { forwardRef, Module } from '@nestjs/common';
import { CircularModule } from './circular.module';

@Module({
  imports: [forwardRef(() => CircularModule)], // 模块正向引用，解决循环依赖问题
  controllers: [],
  providers: [],
  exports: [],
})
export class CircularCommonModule {}
