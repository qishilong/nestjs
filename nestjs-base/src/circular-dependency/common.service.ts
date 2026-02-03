import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CircularService } from './circular.service';

@Injectable()
export class CommonService {
  constructor(
    // 前向引用，解决循环依赖问题
    @Inject(forwardRef(() => CircularService))
    private circularService: CircularService,
  ) {}

  getHello(): string {
    return 'Hello from CommonService!';
  }
}
