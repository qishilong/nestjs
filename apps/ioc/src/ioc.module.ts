import { Module } from "@nestjs/common";
import { IocController } from "./ioc.controller";
import { IocService } from "./ioc.service";
import { OtherModule } from "./other/other.module";

@Module({
  imports: [OtherModule],
  controllers: [IocController],
  providers: [IocService]
})
export class IocModule {}
