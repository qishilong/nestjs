import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ContextIdFactory } from '@nestjs/core';
import { AggregateByTenantContextIdStrategy } from './utils/aggregate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局应用自定义的上下文ID策略
  // ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
