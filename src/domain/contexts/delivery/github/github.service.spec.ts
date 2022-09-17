import { MockType, repositoryMockFactory } from "../../../../../test/test-helper";
import { Test, TestingModule } from "@nestjs/testing";

import { Deployment } from "../../../entities/deployment.entity";
import { Event } from "../../../entities/event.entity";
import { GithubService } from "./github.service";
import { Repository } from "typeorm";
import { Task } from "../../../entities/task.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("GitHub Service", () => {
  let service: GithubService;
  let eventRepository: MockType<Repository<Event>>;
  let taskRepository: MockType<Repository<Task>>;
  let deploymentRepository: MockType<Repository<Deployment>>;

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
        GithubService,
        {
          provide: getRepositoryToken(Event),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Task),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Deployment),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
    eventRepository = module.get(getRepositoryToken(Event));
    taskRepository = module.get(getRepositoryToken(Task));
    deploymentRepository = module.get(getRepositoryToken(Deployment));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
