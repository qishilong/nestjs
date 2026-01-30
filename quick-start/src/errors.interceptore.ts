import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

// 利用RxJS的catchError()操作符来覆盖抛出的异常：
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) =>
          throwError(
            () => new BadGatewayException('Bad Gateway Error from Interceptor'),
          ),
        ),
      );
  }
}
