import { Injectable } from "@nestjs/common";

@Injectable()
export class FirstDemoService {
  getHello(): string {
    return "Hello World!";
  }
}
