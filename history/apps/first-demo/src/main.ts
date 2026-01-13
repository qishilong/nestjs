import { NestFactory } from "@nestjs/core";
import { FirstDemoModule } from "./first-demo.module";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(FirstDemoModule);
  app.useStaticAssets("apps/first-demo/public", {
    prefix: "/static",
  });
  await app.listen(3000);
}
bootstrap();
