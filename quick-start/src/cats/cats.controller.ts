import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Redirect,
  Query,
  Param,
  HostParam,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Get()
  // findAll(
  //   @Req() request: Request,
  //   @Res({
  //     passthrough: true,
  //   })
  //   response: Response,
  // ): string {
  //   return 'This action returns all cats';
  // }

  @Get()
  async findAllAsync(@Query('age') age: number, @Query('bread') bread: string) {
    return `This action returns all cats with age: ${age} and breed: ${bread}`;
  }

  @Post()
  createAsync(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('abcd/*')
  @Redirect('https://nestjs.com', 301)
  getAbcd() {
    return 'This action returns all cats for abcd/* route';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get(':id')
  findOneById(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}

@Controller({
  host: 'api.cats.com',
})
export class CatsHostController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}

@Controller({
  host: ':account.cats.com',
})
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }

  @Get()
  async findAllAsync(): Promise<string[]> {
    return ['cat1', 'cat2'];
  }

  @Get()
  findAll(): Observable<string[]> {
    return of(['cat1', 'cat2']);
  }
}
