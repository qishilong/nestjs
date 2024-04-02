import { Injectable } from "@nestjs/common";

@Injectable()
export class OtherService {
  other() {
    return "other";
  }
}
