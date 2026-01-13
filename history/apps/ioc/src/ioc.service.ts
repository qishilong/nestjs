import { Inject, Injectable } from "@nestjs/common";
import { OtherService } from "./other/other.service";

@Injectable()
export class IocService {
  @Inject(OtherService)
  private otherService: OtherService;

  getHello(): string {
    return "Hello World!" + this.otherService.other();
  }
}
