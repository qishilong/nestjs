import { Controller, Get } from "@nestjs/common";
import { FirstDemoService } from "./first-demo.service";

@Controller()
export class FirstDemoController {
  constructor(private readonly firstDemoService: FirstDemoService) {}

  @Get()
  getHello(): string {
    return this.firstDemoService.getHello();
  }
}
