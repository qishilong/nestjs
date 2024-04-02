import { NestFactory } from '@nestjs/core';
import { IocModule } from './ioc.module';

async function bootstrap() {
  const app = await NestFactory.create(IocModule);
  await app.listen(3000);
}
bootstrap();
