import {
  Module,
  NestModule,
  MiddlewareConsumer,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
// import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './logger.middleware';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './cats/validation.pipe';
import { RolesGuard } from './roles.guard';
// import { logger } from './logger.middleware';
// import { CatsController } from './cats/cats.controller';

@Module({
  // imports: [CatsModule, DatabaseModule.forRoot()],
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 注意，在依赖注入方面，从任何模块外部注册的全局管道（如上面的示例中使用useGlobalPipes()）无法注入依赖项，因为绑定是在任何模块的上下文之外完成的。为了解决这个问题，可以使用以下结构直接从任何模块设置全局管道
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // 全局守卫。全局守卫在整个应用程序中使用，适用于每个控制器和每个路由处理器。就依赖注入而言，从任何模块外部注册的全局守卫（如上面的示例中使用useGlobalGuards()）无法注入依赖项，因为这是在任何模块的上下文之外完成的。为了解决这个问题，你可以使用以下结构直接从任何模块设置守卫
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  // exports: [DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * LoggerMiddleware Class
     */
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // Applying middleware to specific route and method
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   // path: 'cats',
    //   // path: 'abcd/*splat', // wildcard route example
    //   // path: 'abcd/:id', // route with parameter example
    //   path: 'abcd/{*splat}', // 通配符是可选的，可以匹配到 abcd/ 以及 abcd/后面的所有内容
    //   method: RequestMethod.GET,
    // });
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController); // Applying middleware to a specific controller
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude(
    //     {
    //       path: 'cats',
    //       method: RequestMethod.GET,
    //     },
    //     {
    //       path: 'cats',
    //       method: RequestMethod.POST,
    //     },
    //     'cats/{*splat}', // Excluding wildcard route
    //   )
    //   .forRoutes(CatsController); // Applying middleware to a specific controller
    /**
     * logger Function
     * 如果中间件不需要任何依赖想，可以考虑使用简单的功能性中间件函数代替类
     */
    // consumer.apply(logger).forRoutes(CatsController); // Applying middleware to a specific controller
    /**
     * 多个中间件
     */
    // consumer.apply(logger, cors(), helmet()).forRoutes(CatsController);
    /**
     * 全局应用中间件
     */
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
