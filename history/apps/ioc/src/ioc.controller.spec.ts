import { Test, TestingModule } from '@nestjs/testing';
import { IocController } from './ioc.controller';
import { IocService } from './ioc.service';

describe('IocController', () => {
  let iocController: IocController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IocController],
      providers: [IocService],
    }).compile();

    iocController = app.get<IocController>(IocController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(iocController.getHello()).toBe('Hello World!');
    });
  });
});
