import { NestFactory } from '@nestjs/core';
import { FirstDemoModule } from './first-demo.module';

async function bootstrap() {
  const app = await NestFactory.create(FirstDemoModule);
  await app.listen(3000);
}
bootstrap();
