import { Controller, Scope, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

// 对于请求作用域的控制器，会为每个入站请求创建一个新实例，并在请求处理完成后进行垃圾回收。
// REQUEST 作用域会在注入链中向上传递。依赖于请求作用域提供程序的控制器本身也会是请求作用域的。
// 想象一下以下依赖关系图：CatsController <- CatsService <- CatsRepository。如果CatsService是请求作用域的（而其他的是默认单例），那么CatsController将变为请求作用域，因为它依赖于注入的服务。不依赖于其他组件的CatsRepository将保持单例作用域。
// 瞬态作用域的依赖项不遵循该模式。如果单例作用域的DogsService注入了瞬态的LoggerService提供程序，它将获得一个新的实例。但是，DogsService仍将保持单例作用域，因此在任何地方注入它都不会解析为DogsService的新实例。如果这是期望的行为，DogsService也必须显式标记为TRANSIENT。

/**
 * 提供者可以具有以下任何作用域：
DEFAULT	:服务提供者的单个实例在整个应用程序中共享。该实例的生命周期与应用程序的生命周期直接绑定。应用程序一旦启动，所有单例服务提供者都会被实例化。单例作用域是默认使用的。
REQUEST	:为每个传入的请求会专门创建一个提供程序的新实例。该实例在请求处理完成后会被垃圾回收。
TRANSIENT	:瞬态提供程序不会在多个消费者之间共享。每个注入瞬态提供程序的消费者都会收到一个新的专用实例。
 */

@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getCatsMessage(): string {
    return this.catsService.getRootMessage();
  }
}
