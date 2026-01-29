import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findOne(id: number) {
    return 'This action returns a #' + id + ' cat';
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findAllDefaultValue(activeOnly: boolean, page: number): Cat[] {
    console.log(`activeOnly: ${activeOnly}, page: ${page}`);
    return this.cats;
  }
}
