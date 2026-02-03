import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(res: Request, req: Response, next: NextFunction) {
    console.log(
      `[${new Date().toISOString()}] ${res.method} ${res.originalUrl}`,
    );
    next();
  }
}
