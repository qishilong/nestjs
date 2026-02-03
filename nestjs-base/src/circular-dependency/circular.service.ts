import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CommonService } from './common.service';

@Injectable()
export class CircularService {
  constructor(
    // 前向引用，解决循环依赖问题
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  getHello(): string {
    return 'Hello from CircularService!';
  }
}
