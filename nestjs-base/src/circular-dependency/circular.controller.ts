import { Controller, Get } from '@nestjs/common';
import { CircularService } from './circular.service';

@Controller('circular-service')
export class CircularController {
  constructor(private readonly circularService: CircularService) {}

  @Get()
  getHello(): string {
    return this.circularService.getHello();
  }
}
