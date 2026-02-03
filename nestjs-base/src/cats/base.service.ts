import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class BaseService {
  // 如果你想获取提供程序被构造时所在的类（例如在日志记录或指标提供程序中），可以注入INQUIRER令牌。
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sayHello(message: string) {
    console.log(
      `${this.parentClass?.constructor?.name} Hello from BaseService! Message: ${message}`,
    );
  }
}
