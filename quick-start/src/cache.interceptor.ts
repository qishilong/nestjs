import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 简单示例：始终返回缓存的响应
    const cachedResponse = { data: 'This is cached data' };
    const cached = true;

    if (cached) {
      console.log('Returning cached response');
      return of(cachedResponse);
    }
    return next.handle();
  }
}
