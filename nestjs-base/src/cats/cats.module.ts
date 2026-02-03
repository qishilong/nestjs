import { Module, Scope, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { BaseService } from './base.service';
import { LoggerMiddleware } from 'src/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Module({
  providers: [
    // 单例作用域是默认使用的，无需声明。如果确实想将提供者声明为单例作用域，请为scope属性使用Scope.DEFAULT值。
    // Websocket 网关不应使用请求作用域的提供程序，因为它们必须作为单例运行。每个网关都封装了一个实际的套接字，不能被多次实例化。这一限制也适用于其他一些提供程序，例如Passport 策略或定时任务控制器。
    // {
    //   provide: 'CACHE_MANAGER',
    //   useClass: CacheManager,
    //   scope: Scope.TRANSIENT,
    // },
    BaseService,
    CatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

    // 将常规 provider 转换为持久化 provider
    // {
    //   provide: 'foobar',
    //   useFactory: () => {},
    //   scope: Scope.REQUEST,
    //   durable: true,
    // },
  ],
  controllers: [CatsController],
  exports: [],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
