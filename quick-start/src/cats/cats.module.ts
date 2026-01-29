import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
// import { APP_FILTER } from '@nestjs/core';
// import { CatchEverythingFilter } from './http-exception.filter';

@Global()
@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // {
    //   provide: APP_FILTER,
    //   useClass: CatchEverythingFilter,
    // },
  ],
  exports: [CatsService],
})
export class CatsModule {}
