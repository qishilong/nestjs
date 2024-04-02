import { Controller, Get } from "@nestjs/common";
import { IocService } from "./ioc.service";

@Controller()
export class IocController {
  // ICO 容器
  constructor(private readonly iocService: IocService) {}

  // constructor() {}
  // private readonly iocService: IocService;

  @Get()
  getHello(): string {
    return this.iocService.getHello();
  }
}
