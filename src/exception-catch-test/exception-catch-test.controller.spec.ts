import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionCatchHelloWorldController } from './exception-catch-test.controller';

describe('ExceptionCatchHelloWorldController', () => {
  let controller: ExceptionCatchHelloWorldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExceptionCatchHelloWorldController],
    }).compile();

    controller = module.get<ExceptionCatchHelloWorldController>(
      ExceptionCatchHelloWorldController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
