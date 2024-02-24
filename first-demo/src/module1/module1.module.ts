import { Module } from '@nestjs/common';

@Module({})
export class Module1Module {
  #a;
  #b;
  constructor(a, b) {
    this.#a = '1';
  }
}
