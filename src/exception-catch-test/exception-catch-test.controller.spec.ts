import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionCatchTestController } from './exception-catch-test.controller';

describe('ExceptionCatchHelloWorldController', () => {
  let controller: ExceptionCatchTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExceptionCatchTestController],
    }).compile();

    controller = module.get<ExceptionCatchTestController>(
      ExceptionCatchTestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
