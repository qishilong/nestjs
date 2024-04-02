import { Module } from "@nestjs/common";
import { FirstDemoController } from "./first-demo.controller";
import { FirstDemoService } from "./first-demo.service";
import { PersonModule } from "./person/person.module";

@Module({
  imports: [PersonModule],
  controllers: [FirstDemoController],
  providers: [FirstDemoService]
})
export class FirstDemoModule {}
