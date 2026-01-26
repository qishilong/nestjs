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
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { ForbiddenException } from './forbidden.exceptions';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
@UseFilters(new HttpExceptionFilter()) // 这种结构会为在CatsController中定义的每个路由处理器设置HttpExceptionFilter。
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
  findAll() {
    try {
      // throw new Error('Simulated error');
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom error message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('error-forbidden')
  findAllForbidden(): string {
    throw new ForbiddenException();
  }

  @Get()
  findAllAsync(@Query('age') age: number, @Query('bread') bread: string) {
    return `This action returns all cats with age: ${age} and breed: ${bread}`;
  }

  @Get('error')
  findAllError(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN, {
      cause: new Error('This is a custom error message'),
      description: 'You do not have access to this resource',
    });
  }

  @Post('post')
  @UseFilters(new HttpExceptionFilter())
  createForbiddenException(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Post()
  createAsync(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Post('post')
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
