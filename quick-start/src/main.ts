import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './cats/http-exception.filter';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { logger } from './logger.middleware';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set('query parser', 'extended');
  const app = await NestFactory.create(AppModule);
  // app.use(logger);  // 全局应用中间件
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局应用异常过滤器 (useGlobalFilters()方法不会为网关或混合应用程序设置过滤器。)

  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
