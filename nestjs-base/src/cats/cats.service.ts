import { Injectable, Scope } from '@nestjs/common';
import { BaseService } from './base.service';

// 使用请求作用域的提供者会对应用程序性能产生影响。尽管Nest会尽可能缓存元数据，但它仍然必须在每个请求上创建类的实例。因此，这会减慢平均响应时间和整体基准测试结果。除非提供者必须是请求作用域，否则强烈建议使用默认的单例作用域。
// 正如上一节所提到的，请求作用域的提供程序可能会导致延迟增加，因为至少有一个请求作用域的提供程序（注入到控制器实例中，或者更深层次地注入到其某个提供程序中）也会使控制器成为请求作用域。这意味着它必须为每个单独的请求重新创建（实例化）（之后会被垃圾回收）。现在，这也意味着，假设有30000个并行请求，将会有30000个临时的控制器实例（及其请求作用域的提供程序）。

@Injectable({
  scope: Scope.REQUEST,
  // durable: true, // 将提供程序标记为持久化，以便在使用请求作用域时跨多个请求重用实例
})
export class CatsService {
  constructor(private baseService: BaseService) {}

  getRootMessage(): string {
    this.baseService.sayHello('Greetings from CatsService');
    return 'Hello from CatsService!';
  }
}
