import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { logger } from './logger.middleware';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set('query parser', 'extended');
  const app = await NestFactory.create(AppModule);
  // app.use(logger);  // 全局应用中间件
  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
