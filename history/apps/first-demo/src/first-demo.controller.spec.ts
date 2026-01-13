import { Test, TestingModule } from "@nestjs/testing";
import { FirstDemoController } from "./first-demo.controller";
import { FirstDemoService } from "./first-demo.service";

describe("FirstDemoController", () => {
  let firstDemoController: FirstDemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FirstDemoController],
      providers: [FirstDemoService],
    }).compile();

    firstDemoController = app.get<FirstDemoController>(FirstDemoController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(firstDemoController.getHello()).toBe("Hello World!");
    });
  });
});
