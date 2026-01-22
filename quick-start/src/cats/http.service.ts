import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  // constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}

  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
