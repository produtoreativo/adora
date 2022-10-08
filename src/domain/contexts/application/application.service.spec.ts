import { MockType, repositoryMockFactory } from "../../../../test/test-helper";
import { Test, TestingModule } from "@nestjs/testing";

import { Application } from "../../entities/application.entity";
import { ApplicationService } from "./application.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("Application Service", () => {
  let service: ApplicationService;
  let repository: MockType<Repository<Application>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    repository = module.get(getRepositoryToken(Application));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
