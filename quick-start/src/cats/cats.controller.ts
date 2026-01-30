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
  // ParseIntPipe,
  ParseUUIDPipe,
  UsePipes,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { ForbiddenException } from './forbidden.exceptions';
// import { CatchEverythingFilter } from './http-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { ZodValidationPipe } from './zod-validation.pipe';
import { ValidationPipe } from './validation.pipe';
import { ParseIntPipe } from './parse-int.pipe';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
// import { LoggingInterceptor } from 'src/logging.interceptor';
import { TransformInterceptor } from 'src/transform.interceptor';
import { CacheInterceptor } from 'src/cache.interceptor';
import { TimeoutInterceptor } from 'src/timeout.interceptor';

@Controller('cats')
// @UseFilters(new CatchEverythingFilter()) // 这种结构会为在CatsController中定义的每个路由处理器设置HttpExceptionFilter。
// @UseGuards(new RolesGuard())
@UseGuards(RolesGuard) // 为整个CatsController应用RolesGuard
// @UseInterceptors(LoggingInterceptor) // 为整个CatsController应用LoggingInterceptor
@UseInterceptors(TransformInterceptor) // 为整个CatsController应用TransformInterceptor
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

  // @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // createAsync(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  // @UseGuards(RolesGuard) // 应用 RolesGuard 到此路由处理器
  createAsync(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Post('post')
  @Roles(['admin'])
  // @SetMetadata('roles', ['admin'])
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('abcd/*')
  @UseInterceptors(CacheInterceptor)
  // @Redirect('https://nestjs.com', 301)
  getAbcd() {
    return 'This action returns all cats for abcd/* route';
  }

  @Get('docs')
  @UseInterceptors(TimeoutInterceptor)
  // @Redirect('https://docs.nestjs.com', 302)
  async getDocs(@Query('version') version) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  @Get('/uuid/:uuid')
  findOneByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string): string {
    return `This action returns a cat with UUID: ${uuid}`;
  }

  @Get('default-value')
  findAllDefaultValue(
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAllDefaultValue(activeOnly, page);
  }

  // @Get(':id')
  // findOneById(@Param('id') id: string): string {
  //   return `This action returns a #${id} cat`;
  // }

  // 确保动态参数路由 (:id) 放在静态路径路由之后，:id 参数会匹配到任何内容
  @Get(':id')
  findOne(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      new ParseIntPipe(), // 使用自定义的 ParseIntPipe
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
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
