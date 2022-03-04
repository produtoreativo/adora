import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from '../..//entities/application.entity';

@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('application')
  async createApplication(
    @Body() application: Application,
  ): Promise<Application> {
    return this.applicationService.createApplication(application);
  }
}
