import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Application } from "../..//entities/application.entity";

import { Repository } from "typeorm";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async createApplication(application: Application): Promise<Application> {
    return this.applicationRepository.save({
      createdBy: "",
      lastChangedBy: "",
      ...application,
    });
  }
}
