import { Controller, HttpStatus, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats/express')
export class CatsExpressController {
  @Post()
  create(@Res() res: Response) {
    res
      .status(HttpStatus.CREATED)
      .send('This action adds a new cat using Express response object');
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    res
      .status(HttpStatus.OK)
      .send('This action returns all cats using Express response object');
  }
}
