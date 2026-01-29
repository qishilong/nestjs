import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './roles.guard';
// import { HttpExceptionFilter } from './cats/http-exception.filter';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { logger } from './logger.middleware';
// import { ValidationPipe } from './cats/validation.pipe';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set('query parser', 'extended');
  const app = await NestFactory.create(AppModule);
  // app.use(logger);  // 全局应用中间件
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局应用异常过滤器 (useGlobalFilters()方法不会为网关或混合应用程序设置过滤器。)

  // 在混合应用的情况下，useGlobalPipes()方法不会为网关和微服务设置管道。对于“标准”（非混合）微服务应用，useGlobalPipes()会全局挂载管道。注意，在依赖注入方面，从任何模块外部注册的全局管道（如上面的示例中使用useGlobalPipes()）无法注入依赖项，因为绑定是在任何模块的上下文之外完成的。为了解决这个问题，可以使用以下结构直接从任何模块设置全局管道
  // app.useGlobalPipes(new ValidationPipe()); // 全局应用管道

  // app.useGlobalGuards(new RolesGuard()); // 全局应用守卫

  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
